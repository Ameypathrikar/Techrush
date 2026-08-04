import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${destinationQuery}&budget=${budgetQuery}`);
  };

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
          {/* Multi-stage dark overlays for readability */}
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Glassmorphic Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/40 text-teal-300 text-xs font-bold shadow-xl shadow-slate-950/50"
          >
            <FiZap className="text-teal-400 animate-pulse" />
            <span>AI Itinerary Engine & Real-Time Weather Planning</span>
          </motion.div>

          {/* Main Hero Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white drop-shadow-md"
          >
            Plan Perfect Trips with <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Live Weather & Smart Guidance
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed drop-shadow"
          >
            Discover seasonal destinations, craft daily activity schedules, estimate travel budgets, 
            and avoid overcrowded tourist spots with live condition maps.
          </motion.p>

          {/* Frosted Glass Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto pt-4"
          >
            <form 
              onSubmit={handleSearch}
              className="p-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-full border border-slate-700/60 shadow-2xl shadow-slate-950/80 grid grid-cols-1 sm:grid-cols-12 gap-3 text-left items-center"
            >
              <div className="sm:col-span-5 px-4 py-2 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-slate-700/60">
                <FiMapPin className="text-teal-400 text-lg flex-shrink-0" />
                <div className="w-full">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-300">Destination</label>
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Goa, Manali)"
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 px-4 py-2 flex items-center gap-3">
                <FiDollarSign className="text-emerald-400 text-lg flex-shrink-0" />
                <div className="w-full">
                  <label className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-300">Max Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2,000 / day"
                    value={budgetQuery}
                    onChange={(e) => setBudgetQuery(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl sm:rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30 transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <FiSearch className="text-sm stroke-[3]" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="font-semibold text-slate-300 drop-shadow">Popular:</span>
              {["Goa", "Manali", "Jaipur", "Munnar"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setDestinationQuery(tag)}
                  className="px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-slate-200 font-medium transition-colors border border-slate-700/60 cursor-pointer shadow-sm"
                >
                  {tag}
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
          {filteredTrending.slice(0, 3).map((dest) => (
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