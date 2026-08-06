import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiAlertCircle } from "react-icons/fi";

const DESTINATION_OPTIONS = [
  {
    id: "manali",
    name: "Manali",
    category: "Mountains",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    weather: "4°C (Snowy)",
    budget: "₹2500 / day",
    crowd: "Normal",
    rating: "4.8 / 5.0",
    bestTime: "October to February",
    attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali"]
  },
  {
    id: "goa",
    name: "Goa",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    weather: "28°C (Sunny)",
    budget: "₹1800 / day",
    crowd: "Busy",
    rating: "4.6 / 5.0",
    bestTime: "November to March",
    attractions: ["Baga Beach", "Calangute Beach", "Dudhsagar Falls", "Fort Aguada"]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    weather: "22°C (Pleasant)",
    budget: "₹2200 / day",
    crowd: "Overcrowded",
    rating: "4.7 / 5.0",
    bestTime: "November to February",
    attractions: ["Amer Fort", "Hawa Mahal", "City Palace", "Jal Mahal"]
  },
  {
    id: "bali",
    name: "Bali",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    weather: "30°C (Sunny)",
    budget: "₹4500 / day",
    crowd: "Busy",
    rating: "4.9 / 5.0",
    bestTime: "April to October",
    attractions: ["Ubud Monkey Forest", "Tanah Lot Temple", "Mount Batur", "Seminyak Beach"]
  },
  {
    id: "paris",
    name: "Paris",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    weather: "19°C (Pleasant)",
    budget: "₹9500 / day",
    crowd: "Overcrowded",
    rating: "4.7 / 5.0",
    bestTime: "June to August",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Montmartre"]
  }
];

export default function Compare() {
  const [destA, setDestA] = useState("manali");
  const [destB, setDestB] = useState("goa");
  const [error, setError] = useState("");

  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);

  const dropdownRefA = useRef(null);
  const dropdownRefB = useRef(null);

  // Close custom dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefA.current && !dropdownRefA.current.contains(event.target)) setIsOpenA(false);
      if (dropdownRefB.current && !dropdownRefB.current.contains(event.target)) setIsOpenB(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const itemA = DESTINATION_OPTIONS.find((d) => d.id === destA);
  const itemB = DESTINATION_OPTIONS.find((d) => d.id === destB);

  const handleSelectA = (id) => {
    if (id === destB) {
      setError("Cannot compare the same destination. Please choose a different location.");
    } else {
      setError("");
    }
    setDestA(id);
    setIsOpenA(false);
  };

  const handleSelectB = (id) => {
    if (id === destA) {
      setError("Cannot compare the same destination. Please choose a different location.");
    } else {
      setError("");
    }
    setDestB(id);
    setIsOpenB(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a12] text-slate-900 dark:text-white pt-28 pb-20 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Compare Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Evaluate weather, estimated daily budgets, crowd levels, and top attractions side-by-side.
          </p>
        </div>

        {/* Custom Dropdowns & Error Section */}
        <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/95 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Dropdown A */}
            <div className="space-y-2 relative" ref={dropdownRefA}>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Select Destination A
              </label>
              <div
                onClick={() => setIsOpenA(!isOpenA)}
                className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer shadow-sm hover:border-teal-500 transition-all"
              >
                <span>{itemA ? itemA.name : "Choose first destination..."}</span>
                <FiChevronDown className={`transition-transform duration-200 ${isOpenA ? "rotate-180 text-teal-400" : "text-slate-400"}`} />
              </div>

              {isOpenA && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1">
                  {DESTINATION_OPTIONS.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleSelectA(d.id)}
                      className={`px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                        destA === d.id
                          ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#162238]"
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] uppercase text-slate-400">{d.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown B */}
            <div className="space-y-2 relative" ref={dropdownRefB}>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Select Destination B
              </label>
              <div
                onClick={() => setIsOpenB(!isOpenB)}
                className="w-full bg-slate-50 dark:bg-[#070b14] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer shadow-sm hover:border-teal-500 transition-all"
              >
                <span>{itemB ? itemB.name : "Choose second destination..."}</span>
                <FiChevronDown className={`transition-transform duration-200 ${isOpenB ? "rotate-180 text-teal-400" : "text-slate-400"}`} />
              </div>

              {isOpenB && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1">
                  {DESTINATION_OPTIONS.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleSelectB(d.id)}
                      className={`px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                        destB === d.id
                          ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#162238]"
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] uppercase text-slate-400">{d.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-bold">
              <FiAlertCircle className="text-base shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison Table Card */}
        {itemA && itemB && !error ? (
          <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {/* Preview Images & Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[itemA, itemB].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {idx === 0 ? "Preview A" : "Preview B"}
                  </div>
                  <div className="h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{item.name}</h3>
                </div>
              ))}
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Comparison Rows */}
            <div className="space-y-6 text-xs sm:text-sm">
              
              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Category</span>
                <span className="font-black text-slate-900 dark:text-white">{itemA.category}</span>
                <span className="font-black text-slate-900 dark:text-white">{itemB.category}</span>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Live Weather</span>
                <span className="font-black text-amber-600 dark:text-amber-400">🌤️ {itemA.weather}</span>
                <span className="font-black text-amber-600 dark:text-amber-400">🌤️ {itemB.weather}</span>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Est. Daily Budget</span>
                <span className="font-black text-teal-600 dark:text-teal-400">{itemA.budget}</span>
                <span className="font-black text-teal-600 dark:text-teal-400">{itemB.budget}</span>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Traffic / Crowd Level</span>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    itemA.crowd === "Normal" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    itemA.crowd === "Busy" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                  }`}>
                    {itemA.crowd}
                  </span>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    itemB.crowd === "Normal" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    itemB.crowd === "Busy" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                  }`}>
                    {itemB.crowd}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">User Rating</span>
                <span className="font-black text-amber-500">★ {itemA.rating}</span>
                <span className="font-black text-amber-500">★ {itemB.rating}</span>
              </div>

              <div className="grid grid-cols-3 items-center py-3 border-b border-slate-100 dark:border-slate-800/60">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Best Time to Visit</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{itemA.bestTime}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{itemB.bestTime}</span>
              </div>

              <div className="grid grid-cols-3 items-start py-3">
                <span className="font-bold text-slate-400 uppercase text-[10px] pt-1">Top Attractions</span>
                <ul className="space-y-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  {itemA.attractions.map((attr, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-teal-500">✓</span> {attr}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  {itemB.attractions.map((attr, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-teal-500">✓</span> {attr}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}