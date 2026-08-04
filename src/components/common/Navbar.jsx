import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiNavigation } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Planner", path: "/planner" },
    { name: "Compare", path: "/compare" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <FiNavigation className="text-base rotate-45" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Trip<span className="text-teal-600">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs font-bold text-slate-600 hover:text-slate-900">
            Log In
          </Link>
          <Link
            to="/planner"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold shadow-sm transition-colors"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}