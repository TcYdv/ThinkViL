"use client";

export default function AuthPanel({ isSignup, toggleSignup }: { isSignup: boolean; toggleSignup: () => void }) {
  return (
    <div
      className={`w-full md:w-1/2 p-10 flex flex-col justify-center items-center text-white transition-all duration-700 ${
        isSignup ? "bg-green-500" : "bg-blue-500"
      }`}
    >
      <h2 className="text-3xl font-bold">{isSignup ? "Welcome Back!" : "Hello, Friend!"}</h2>
      <p className="text-center text-lg mt-2">
        {isSignup ? "Login with your personal details" : "Enter your personal details to start your journey with us"}
      </p>
      <button
        className="mt-4 px-6 py-2 border text-lg font-bold border-black rounded-full hover:bg-gray-200 hover:text-black transition-all bg-green-800 hover:font-bold"
        onClick={toggleSignup}
      >
        {isSignup ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
}
