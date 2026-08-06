import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin, FiDollarSign, FiArrowRight, FiZap } from "react-icons/fi";
import WeatherBadge from "../components/common/WeatherBadge";

const DESTINATION_LIST = [
  { id: "goa", name: "Goa Beaches", category: "BEACHES", price: 1800, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80", desc: "Famous for vibrant nightlife, golden sand beaches, and water sports." },
  { id: "manali", name: "Manali, Himachal Pradesh", category: "MOUNTAINS", price: 2500, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", desc: "Snow-capped peaks, alpine valleys, and thrilling mountain adventure hubs." },
  { id: "ladakh", name: "Leh Ladakh, Jammu & Kashmir", category: "MOUNTAINS", price: 3200, image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80", desc: "Breathtaking high-desert landscape featuring pristine blue lakes and mountain passes." },
  { id: "jaipur", name: "Jaipur, Rajasthan", category: "HERITAGE", price: 2200, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80", desc: "Majestic forts, pink sandstone palaces, and vibrant royal culture." },
  { id: "udaipur", name: "Udaipur, Rajasthan", category: "HERITAGE", price: 2600, image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&q=80", desc: "Known as the City of Lakes, celebrated for lavish palaces and boat cruises." },
  { id: "munnar", name: "Munnar, Kerala", category: "MOUNTAINS", price: 2000, image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80", desc: "Serene hill station in the Western Ghats surrounded by rolling tea plantations." }
];

export default function Home() {
  const [destination, setDestination] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = DESTINATION_LIST.filter((d) =>
    d.name.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${destination}&budget=${maxBudget}`);
  };

  const handleQuickSelect = (name) => {
    setDestination(name);
    setShowDropdown(false);
    navigate(`/explore?search=${name}`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0e1726] text-slate-900 dark:text-white pt-24 pb-20 px-4 sm:px-8 relative overflow-x-hidden transition-colors duration-500">
      
      {/* Background Image Accent */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40 dark:opacity-55 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#0e1726]/20 via-[#0e1726]/80 to-[#0e1726] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* HERO SECTION WITH INCREASED FONT SIZES */}
        <div className="relative rounded-3xl bg-transparent p-6 sm:p-14 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50/80 dark:bg-teal-950/85 backdrop-blur-md border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm font-extrabold shadow-lg">
            <FiZap className="text-teal-500 text-base" />
            <span>Intelligent Travel Engine</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] drop-shadow-md">
              Find Your Next Escape, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Planned Effortlessly
              </span>
            </h1>
            {/* Slightly increased subtitle font size */}
            <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow">
              Discover optimal destinations, build custom itineraries, and track live conditions — all in one place.
            </p>
          </div>

          {/* Search Box with Larger Input Text */}
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto bg-white/95 dark:bg-[#141f33]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-2xl flex flex-col sm:flex-row items-center gap-3">
            
            <div ref={dropdownRef} className="flex-1 relative flex items-center gap-3 px-3 w-full border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700 pb-2 sm:pb-0">
              <FiMapPin className="text-teal-600 dark:text-teal-400 shrink-0 text-base" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider">
                  DESTINATION
                </label>
                <input
                  type="text"
                  value={destination}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder="Where to? (e.g. Goa, Manali, Ladakh)"
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none"
                />
              </div>

              {showDropdown && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 text-left">
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setDestination(item.name);
                        setShowDropdown(false);
                      }}
                      className="p-3.5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-[#1c2942] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-300">{item.category} • ₹{item.price}/day</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">Select →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center gap-3 px-3 w-full">
              <FiDollarSign className="text-teal-600 dark:text-teal-400 shrink-0 text-base" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-400 tracking-wider">
                  MAX BUDGET
                </label>
                <input
                  type="text"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="e.g. ₹2,000 / day"
                  className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 cursor-pointer shrink-0"
            >
              <FiSearch className="text-base" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="relative flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-bold">
            <span className="px-3.5 py-2 rounded-xl bg-slate-900/80 dark:bg-black/60 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-black uppercase shadow-sm">
              🔥 POPULAR:
            </span>
            {["Goa", "Manali", "Ladakh", "Jaipur", "Udaipur", "Rishikesh"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleQuickSelect(name)}
                className="px-4 py-2 rounded-xl bg-white/90 dark:bg-[#141f33]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:text-teal-400 transition-all cursor-pointer shadow-sm text-sm"
              >
                {name}
              </button>
            ))}
          </div>

        </div>

        {/* TRENDING DESTINATIONS GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Trending Destinations & Itineraries
            </h2>
            <button
              onClick={() => navigate("/explore")}
              className="text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              View All Explore Map →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATION_LIST.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300 hover:border-teal-500/60 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-teal-400 text-xs font-black uppercase rounded-lg border border-slate-700 shadow-sm">
                    {item.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black rounded-lg border border-slate-700 shadow-sm">
                    ₹{item.price} / day
                  </span>
                  <div className="absolute bottom-3 left-3">
                    <WeatherBadge destinationId={item.id} />
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/planner?dest=${item.id}`)}
                    className="w-full py-3.5 bg-slate-100 dark:bg-[#0e1726] hover:bg-teal-400 hover:text-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-black rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <span>Create Itinerary</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "120+", label: "DESTINATIONS", icon: "🧩" },
            { value: "50K+", label: "HAPPY TRAVELERS", icon: "⭐" },
            { value: "500+", label: "TRIPS PLANNED", icon: "📊" },
            { value: "4.9★", label: "AVERAGE RATING", icon: "🛡️" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 text-center space-y-1.5 shadow-lg">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="relative rounded-3xl bg-white dark:bg-[#141f33] border border-slate-200 dark:border-slate-700/80 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3.5 py-1.5 bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-black uppercase rounded-full shadow-sm">
              ✨ Ready to Plan Your Next Trip?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Generate custom itineraries, calculate budgets, and manage your travel packing list in seconds.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => navigate("/planner")}
              className="w-full sm:w-auto px-7 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              <span>Start Planning</span> <FiArrowRight />
            </button>
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="w-full sm:w-auto px-7 py-4 bg-slate-100 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-white font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <span>Explore Map</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}