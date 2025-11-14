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
            <a href="#popular" className="text-red-50 hover:text-red-500 transition-colors duration-300">Popular</a>
            <a href="#now-playing" className="text-red-50 hover:text-red-500 transition-colors duration-300">Now Playing</a>
            <a href="#top-rated" className="text-red-50 hover:text-red-500 transition-colors duration-300">Top Rated</a>
            <a href="#trending" className="text-red-50 hover:text-red-500 transition-colors duration-300">Trending</a>
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
        <nav className="md:hidden bg-black border-t border-white/10 p-4 space-y-3">
          <a href="#popular" className="block text-red-50 hover:text-red-500 transition-all duration-300">Popular</a>
          <a href="#now-playing" className="block text-red-50 hover:text-red-500 transition-all duration-300">Now Playing</a>
          <a href="#top-rated" className="block text-red-50 hover:text-red-500 transition-all duration-300">Top Rated</a>
          <a href="#trending" className="block text-red-50 hover:text-red-500 transition-all duration-300">Trending</a>
        </nav>
      )}
    </header>
  );
}
