"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for menu button
  const { data: session, status } = useSession();

  // Close menu when clicking outside but NOT when clicking inside the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && // Click is outside menu
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) // Click is NOT the button
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu immediately when clicking a navigation link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-[100] px-4 py-4 flex justify-between items-center rounded-xl">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold flex items-center active:scale-105" onClick={handleNavClick}>
        <span className="ml-2 font-extrabold font-[cursive] italic">ThinkViL</span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        ref={buttonRef} // Assign button reference
        className="md:hidden focus:outline-none"
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        ref={menuRef}
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:space-x-2 p-4 md:p-0 shadow-md md:shadow-none transition-all ${isMenuOpen ? "block" : "hidden"}`}
      >
        {[
          { href: "/simulations/physics", label: "Physics" },
          { href: "/simulations/mathematics", label: "Mathematics" },
          { href: "/simulations/chemistry", label: "Chemistry" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => (
          <li key={href} onClick={handleNavClick}>
            <Link href={href} className="px-3 py-2 rounded-xl font-semibold block hover:bg-sky-300 hover:text-black">
              {label}
            </Link>
          </li>
        ))}

        {/* Login / Logout Button */}
        <li onClick={handleNavClick}>
          {status === "authenticated" ? (
            <button
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="px-3 py-2 rounded-xl font-semibold block bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="login-donate-btn px-3 py-2 rounded-xl font-semibold block bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </li>
      </ul>

      {/* Right Section (Donate) */}
      <div className="flex items-center space-x-4">
        {/* Donate Button */}
        <Link
          href="/donate"
          className="login-donate-btn px-4 py-2 bg-red-500 text-white rounded-xl hover:text-black transition font-semibold"
        >
          Donate
        </Link>
      </div>
    </nav>
  );
}
