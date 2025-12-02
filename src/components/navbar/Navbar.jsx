"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-300 
        ${navBg ? "backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg" 
                : "backdrop-blur-md bg-white/5"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          ACM - HIT
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg font-medium">
          {["Home", "About", "Events", "Team", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group cursor-pointer"
            >
              <span className="text-white/90 group-hover:text-white transition">
                {item}
              </span>

              {/* Tailwind-only underline animation */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Tailwind-only animation) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-white/10 backdrop-blur-xl border-t border-white/20">
          {["Home", "About", "Events", "Team", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-white/90 text-lg hover:text-white transition"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
