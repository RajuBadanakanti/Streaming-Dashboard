"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 py-5">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-gray-100">
          <span className="text-red-500">Stream</span>Hub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-base text-gray-200">
          <Link href="/" className="text-red-50 hover:text-red-500 transition-colors duration-300">Home</Link>
          <Link href="/my-list" className="text-red-50 hover:text-red-500 transition">
            My List
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl text-red-50"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black border-t border-white/10 p-4 space-y-3"  onClick={() => setMenuOpen(!menuOpen)}>
          <Link href="/" className="block text-red-50 hover:text-red-500 transition-all duration-300">Home</Link>
          <Link href="/my-list" className="block text-red-50 hover:text-red-500 transition-all duration-300">My List</Link>
        </nav>
      )}
    </header>
  );
}
