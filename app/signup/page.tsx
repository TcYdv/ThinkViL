"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthPanel from "../components/AuthPanel";
import SocialAuth from "../components/SocialAuth";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < 6) {
      alert("❌ Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup successful! Logging in...");
        await signIn("credentials", { email: formData.email, password: formData.password, redirect: false });
        router.push("/HomeSection"); // Redirect to home page
      } else {
        alert(`❌ Signup failed: ${data.message || "Try again."}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 rounded-xl">
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel */}
        <AuthPanel isSignup={true} toggleSignup={() => router.push("/login")} />

        {/* Right Panel */}
        <div className="w-full p-10">
          <h2 className="text-4xl font-bold text-center text-gray-900">Create Account</h2>

          {/* Social Login */}
          <SocialAuth />

          <p className="text-center font-medium text-xl text-gray-700 mt-2">or use your email to register</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-900 ml-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-xl border-gray-700 border-2"
              />
            </div>
            <div>
              <label className="block text-gray-900 ml-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 border-gray-700 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-gray-900 ml-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-xl border-gray-700 border-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-black font-medium py-2 rounded-xl transition-all text-xl"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
