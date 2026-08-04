import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountUpModule from "react-countup";
import { 
  FiSearch, 
  FiMapPin, 
  FiDollarSign, 
  FiTrendingUp, 
  FiSun, 
  FiCloudSnow, 
  FiArrowRight,
  FiStar,
  FiShield,
  FiZap,
  FiCompass
} from "react-icons/fi";
import { DESTINATIONS } from "../data/destinations";

const CountUp = CountUpModule.default || CountUpModule;

export default function Home() {
  const navigate = useNavigate();
  const [destinationQuery, setDestinationQuery] = useState("");
  const [budgetQuery, setBudgetQuery] = useState("");
  const [activeWeatherFilter, setActiveWeatherFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    navigate(`/explore?search=${destinationQuery}&budget=${budgetQuery}`);
  };

  const handleSelectDestination = (name) => {
    setDestinationQuery(name);
    setShowDropdown(false);
  };

  // Filter destinations for live dropdown list
  const dropdownMatches = DESTINATIONS.filter((dest) =>
    dest.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
    dest.type.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const filteredTrending = DESTINATIONS.filter((dest) => {
    if (activeWeatherFilter === "All") return true;
    return dest.weather?.type === activeWeatherFilter;
  });

  return (
    <div className="w-full bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* HERO SECTION WITH OCEAN / NATURE BACKGROUND IMAGE */}
      <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
            alt="Ocean Beach Sunset Background" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Professional Glass Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/30 text-teal-300 text-xs font-semibold shadow-xl"
          >
            <FiZap className="text-teal-400" />
            <span>Intelligent Travel Engine</span>
          </motion.div>

          {/* Clean Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white drop-shadow-md"
          >
            Find Your Next Escape, <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Planned Effortlessly
            </span>
          </motion.h1>

          {/* Minimal Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-xl mx-auto text-slate-200 text-sm sm:text-base font-normal leading-relaxed drop-shadow"
          >
            Discover optimal destinations, build custom itineraries, and track live conditions—all in one place.
          </motion.p>

          {/* Expanded Floating Search Form */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto pt-6 relative"
            ref={dropdownRef}
          >
            <form 
              onSubmit={handleSearch}
              className="p-4 sm:p-5 bg-slate-900/90 backdrop-blur-2xl rounded-3xl sm:rounded-full border border-teal-500/30 shadow-2xl shadow-slate-950/90 grid grid-cols-1 sm:grid-cols-12 gap-4 text-left items-center"
            >
              {/* Destination Input Box */}
              <div className="sm:col-span-5 px-5 py-3 flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-700/60 relative">
                <FiMapPin className="text-teal-400 text-2xl flex-shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Destination</label>
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Goa, Manali, Ladakh)"
                    value={destinationQuery}
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => {
                      setDestinationQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Max Budget Input Box */}
              <div className="sm:col-span-4 px-5 py-3 flex items-center gap-4">
                <FiDollarSign className="text-emerald-400 text-2xl flex-shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Max Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2,000 / day"
                    value={budgetQuery}
                    onChange={(e) => setBudgetQuery(e.target.value)}
                    className="w-full bg-transparent text-sm sm:text-base font-bold text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Action Button */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-14 rounded-2xl sm:rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-teal-500/30 transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <FiSearch className="text-base stroke-[3]" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* AUTOCOMPLETE DROPDOWN MENU */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-3 bg-slate-900/95 backdrop-blur-2xl border border-teal-500/40 rounded-3xl shadow-2xl shadow-slate-950/90 z-50 overflow-hidden text-left max-h-80 overflow-y-auto divide-y divide-slate-800/80"
                >
                  {dropdownMatches.length === 0 ? (
                    <div className="p-5 text-center text-xs text-slate-400 font-semibold">
                      No matching destinations found.
                    </div>
                  ) : (
                    dropdownMatches.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={() => handleSelectDestination(dest.name)}
                        className="p-4 hover:bg-teal-500/10 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700/60"
                          />
                          <div>
                            <h4 className="text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors">
                              {dest.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {dest.type} • ₹{dest.costPerDay} / day
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                            🌤️ {dest.weather?.temp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ultra-Highlighted Popular Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <span className="font-black text-amber-400 uppercase tracking-widest text-[11px] mr-1 flex items-center gap-1.5 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-sm">
                <span className="animate-pulse">🔥</span> Popular Destinations:
              </span>
              
              {[
                { name: "Goa", emoji: "🏖️" },
                { name: "Manali", emoji: "🏔️" },
                { name: "Ladakh", emoji: "❄️" },
                { name: "Jaipur", emoji: "🏰" },
                { name: "Udaipur", emoji: "👑" },
                { name: "Rishikesh", emoji: "🌊" }
              ].map((dest) => (
                <button
                  key={dest.name}
                  type="button"
                  onClick={() => setDestinationQuery(dest.name)}
                  className="group relative px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-teal-500/20 hover:from-teal-400 hover:to-emerald-400 text-teal-200 hover:text-slate-950 font-extrabold text-xs transition-all duration-300 border border-teal-400/50 hover:border-teal-300 cursor-pointer shadow-lg shadow-teal-950/80 backdrop-blur-md transform hover:-translate-y-0.5 hover:scale-105"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{dest.emoji}</span>
                    <span>{dest.name}</span>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-teal-400/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity pointer-events-none" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* METRICS ROW */}
      <section className="py-12 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Destinations", value: 120, suffix: "+", icon: <FiCompass className="text-teal-400" /> },
            { label: "Happy Travelers", value: 50, suffix: "K+", icon: <FiStar className="text-amber-400" /> },
            { label: "Trips Planned", value: 500, suffix: "+", icon: <FiTrendingUp className="text-cyan-400" /> },
            { label: "Average Rating", value: 4.9, decimals: 1, suffix: "★", icon: <FiShield className="text-emerald-400" /> },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800/80 shadow-lg flex items-center gap-4 hover:border-teal-500/30 transition-colors">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xl">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">
                  {typeof CountUp === "function" ? (
                    <CountUp end={stat.value} duration={2} decimals={stat.decimals || 0} />
                  ) : (
                    stat.value
                  )}
                  {stat.suffix}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DESTINATIONS CARDS */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-8 bg-slate-950">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Weather-Based Discovery</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Trending Seasonal Destinations</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Explore destinations matching current weather conditions.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Seasons", value: "All", icon: <FiTrendingUp /> },
              { label: "Cool / Snowy", value: "Cool", icon: <FiCloudSnow /> },
              { label: "Pleasant", value: "Mild", icon: <FiSun /> },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setActiveWeatherFilter(btn.value)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeWeatherFilter === btn.value
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrending.map((dest) => (
            <div
              key={dest.id}
              className="bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/50 shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-slate-200 text-[11px] font-semibold">
                    🌤️ {dest.weather?.temp} ({dest.weather?.condition})
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white shadow-sm ${
                      dest.trafficStatus === "Overcrowded" ? "bg-rose-500" : dest.trafficStatus === "Busy" ? "bg-amber-500" : "bg-emerald-500"
                    }`}>
                      {dest.trafficStatus}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">{dest.type}</span>
                    <span className="text-xs font-black text-white">₹{dest.costPerDay} <span className="font-normal text-slate-400">/ day</span></span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-teal-400 transition-colors">{dest.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/planner"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700/60"
                >
                  <span>Create Itinerary</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-12 px-4 max-w-6xl mx-auto bg-slate-950">
        <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 border border-teal-500/30 p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Ready to Plan Your Next Trip?</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              Generate custom itineraries, calculate budgets, and manage your travel packing list in seconds.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 relative z-10">
            <Link
              to="/planner"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              <span>Start Planning</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-extrabold text-xs transition-colors border border-slate-700"
            >
              Explore Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}