'use client';

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky z-50 top-0 w-full dark:bg-black bg-zinc-50 border-b border-zinc-200 dark:border-zinc-800 px-6 md:px-10 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-extrabold text-black dark:text-white tracking-wide cursor-pointer">
          <Link href={"/"}>SKILLBRIDGE</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-md font-medium text-black dark:text-white hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-md font-medium text-black dark:text-white hover:underline">
              About
            </Link>
            <Link href="/explore" className="text-md font-medium text-black dark:text-white hover:underline">
              Explore
            </Link>
            <Link href="/contact" className="text-md font-medium text-black dark:text-white hover:underline">
              Contact
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-full border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Log in"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition"
              aria-label="Sign up"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-black dark:text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(!menuOpen)}
              className="block text-lg font-medium text-black dark:text-white hover:underline"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(!menuOpen)}
              className="block text-lg font-medium text-black dark:text-white hover:underline"
            >
              About
            </Link>
            <Link
              href="/explore"
              onClick={() => setMenuOpen(!menuOpen)}
              className="block text-lg font-medium text-black dark:text-white hover:underline"
            >
              Explore
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(!menuOpen)}
              className="block text-lg font-medium text-black dark:text-white hover:underline"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile auth buttons */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            <Link
              href="login"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full text-center px-4 py-2 rounded-full border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Log in"
            >
              Log In
            </Link>
            <Link
              href="signup"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full text-center px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition"
              aria-label="Sign up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
