"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import AuthPanel from "../components/AuthPanel";
import SocialAuth from "../components/SocialAuth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      alert("❌ Invalid login credentials.");
    } else {
      router.push("/"); // Redirect to home page
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 rounded-xl">
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel */}
        <AuthPanel isSignup={false} toggleSignup={() => router.push("/signup")} />

        {/* Right Panel */}
        <div className="w-full p-10">
          <h2 className="text-4xl font-bold text-center text-gray-900">Sign In</h2>

          {/* Social Login */}
          <SocialAuth />

          <p className="text-center text-xl font-medium text-gray-700 mt-2">or use your email to log in</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-900 ml-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border-2 rounded-xl border-gray-700"
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
                className="w-full p-2 border-2 border-gray-700 rounded-xl"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-blue-700 hover:underline text-lg font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 rounded-xl transition-all text-xl"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
