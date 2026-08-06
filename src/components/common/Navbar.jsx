import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar({ darkMode, toggleTheme }) {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Planner", path: "/planner" },
    { name: "Compare", path: "/compare" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#060a12]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-teal-500/20">
            ⚡
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            TripNest
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isActive
                    ? "bg-teal-400 text-slate-950 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions (Theme Toggle & CTA) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:border-teal-500 transition-all cursor-pointer shadow-sm"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FiSun className="text-amber-400 text-base" /> : <FiMoon className="text-slate-700 text-base" />}
          </button>

          <Link
            to="/planner"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-teal-500/20"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}