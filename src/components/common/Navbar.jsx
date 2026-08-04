import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiNavigation, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Planner", path: "/planner" },
    { name: "Compare", path: "/compare" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20">
            <FiNavigation className="text-base rotate-45 stroke-[2.5]" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Trip<span className="text-teal-500">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200 dark:border-slate-700/60">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA + Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            title="Toggle Dark / Light Mode"
          >
            {isDark ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
          </button>

          <Link
            to="/planner"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 text-xs font-black shadow-md shadow-teal-500/20 transition-all transform hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}