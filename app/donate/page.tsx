"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { Heart, DollarSign, Coffee, Gift } from "lucide-react";
import "@/app/globals.css"; // Ensure global styles are imported

const presetAmounts = [
  { amount: 1, icon: Coffee, label: "$1" },
  { amount: 5, icon: Gift, label: "$5" },
  { amount: 10, icon: Heart, label: "$10" },
  { amount: 25, icon: DollarSign, label: "$25" },
];

export default function Donate() {
  const [customAmount, setCustomAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [customState, setCustomState] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.isoCode === country);
      setStates(selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []);
    }
  }, [country, countries]);

  const handleAmountClick = (amount: number) => setCustomAmount(amount.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || Number(customAmount) < 1) {
      alert("Please fill in all required fields and ensure the donation amount is at least $1.");
      return;
    }
    const selectedCountry = country === "Other" ? customCountry.trim() : country;
    const selectedState = country === "Other" ? customState.trim() : state;
    if (!selectedCountry || !selectedState) {
      alert("Please enter a valid country and state.");
      return;
    }
    console.log("Donation Details:", { fullName, email, country: selectedCountry, state: selectedState, amount: customAmount });
    router.push("/thank-you");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-14 m-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">
        
        {/* Top Section for Mobile / Left Section for Desktop */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-black bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 relative">
          
          {/* Floating Background Elements */}
          <div className="absolute w-60 h-60 bg-white opacity-10 rounded-full blur-3xl top-10 left-10 animate-float hidden md:block"></div>
          <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full blur-3xl bottom-10 right-10 animate-float-reverse hidden md:block"></div>

          <h1 className="text-2xl md:text-3xl font-semibold text-center animate-fadeIn">Empower Young Minds with Visual Learning</h1>
          <p className="text-lg md:text-xl text-center mt-4 animate-fadeIn delay-200">
            ThinkViL is revolutionizing the way students understand science and mathematics. 
            Your support enables us to develop immersive simulations, interactive tools, and high-quality educational content.
          </p>
          <p className="text-lg md:text-xl text-center mt-2 animate-fadeIn delay-400">
            Join us in making education engaging, intuitive, and fun.
          </p>
          <p className="text-lg md:text-xl font-bold text-center mt-2 animate-fadeIn delay-600">
            Every Donation Counts. Every Student Matters.
          </p>
        </div>

        {/* Bottom Section for Mobile / Right Section for Desktop */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <p className="text-blue-600 text-center mb-6">Your generosity helps us continue our mission. Make a difference today!</p>

          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
            <input type="text" placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border border-gray-400 rounded-xl" required />
            <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-400 rounded-xl" required />

            <select value={country} onChange={(e) => { setCountry(e.target.value); setState(""); }} className="w-full p-3 border border-gray-400 rounded-xl" required>
              <option value="" disabled>Select Country *</option>
              {countries.map((c) => (<option key={c.isoCode} value={c.isoCode}>{c.name}</option>))}
              <option value="Other">Other</option>
            </select>
            
            {country === "Other" && <input type="text" placeholder="Enter Country *" value={customCountry} onChange={(e) => setCustomCountry(e.target.value)} className="w-full p-3 border border-gray-400 rounded-xl" required />}
            
            {country && states.length > 0 && <select value={state} onChange={(e) => setState(e.target.value)} className="w-full p-3 border border-gray-400 rounded-xl" required>
              <option value="" disabled>Select State *</option>
              {states.map((s) => (<option key={s.isoCode} value={s.isoCode}>{s.name}</option>))}
              <option value="Other">Other</option>
            </select>}

            {(country === "Other" || state === "Other") && <input type="text" placeholder="Enter State *" value={customState} onChange={(e) => setCustomState(e.target.value)} className="w-full p-3 border border-gray-400 rounded-xl" required />}

            {/* Preset Donation Amounts */}
            <div className="grid grid-cols-2 gap-4">
              {presetAmounts.map(({ amount, icon: Icon, label }) => (
                <button key={amount} type="button" onClick={() => handleAmountClick(amount)} className={`flex flex-col items-center justify-center p-4 border-4 rounded-2xl transition-all duration-300 ${customAmount === amount.toString() ? "border-blue-600 bg-blue-100 scale-105" : "border-gray-400 hover:border-blue-500 hover:scale-105"}`}>
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="font-bold">{label}</span>
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <input type="number" placeholder="Enter Custom Amount *" value={customAmount} onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)).toString())} className="w-full p-3 border border-gray-300 rounded-xl" required />

            <button type="submit" className="w-full text-xl bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-all hover:text-black hover:border-black hover:font-bold border-4 border-gray-500">
              Complete Your Gift
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
