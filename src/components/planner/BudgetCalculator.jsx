import React, { useState } from "react";

// Source Cities with Approximate Distances / Zones
const SOURCE_CITIES = [
  { name: "Pune", baseMultiplier: 1.0 },
  { name: "Mumbai", baseMultiplier: 1.05 },
  { name: "Delhi NCR", baseMultiplier: 1.2 },
  { name: "Bangalore", baseMultiplier: 1.15 },
  { name: "Hyderabad", baseMultiplier: 1.1 },
  { name: "Chennai", baseMultiplier: 1.2 },
  { name: "Kolkata", baseMultiplier: 1.3 }
];

const BUDGET_DESTINATIONS = [
  { id: "manali", name: "Manali, Himachal Pradesh", basePrice: 4200, defaultDistFactor: 1.3 },
  { id: "goa", name: "Goa Beaches", basePrice: 3500, defaultDistFactor: 1.0 },
  { id: "jaipur", name: "Jaipur, Rajasthan", basePrice: 3200, defaultDistFactor: 1.1 },
  { id: "udaipur", name: "Udaipur, Rajasthan", basePrice: 3800, defaultDistFactor: 1.1 },
  { id: "darjeeling", name: "Darjeeling, West Bengal", basePrice: 3400, defaultDistFactor: 1.4 },
  { id: "ladakh", name: "Leh Ladakh, J&K", basePrice: 6500, defaultDistFactor: 1.5 },
  { id: "munnar", name: "Munnar, Kerala", basePrice: 3300, defaultDistFactor: 1.1 },
  { id: "varanasi", name: "Varanasi, Uttar Pradesh", basePrice: 2500, defaultDistFactor: 1.2 }
];

const TRANSPORT_MODES = [
  { id: "train", name: "Train 🚆", multiplier: 0.8 },
  { id: "bus", name: "Bus 🚌", multiplier: 0.9 },
  { id: "drive", name: "Self-Drive 🚘", multiplier: 1.2 },
  { id: "flight", name: "Flight ✈️", multiplier: 1.6 }
];

export default function BudgetCalculator() {
  const [selectedSource, setSelectedSource] = useState("Pune");
  const [selectedDestId, setSelectedDestId] = useState("manali");
  const [transportMode, setTransportMode] = useState("train");
  const [tier, setTier] = useState("Standard"); // Budget | Standard | Luxury
  const [days, setDays] = useState(3);

  const selectedDest =
    BUDGET_DESTINATIONS.find((d) => d.id === selectedDestId) || BUDGET_DESTINATIONS[0];
  const sourceObj = SOURCE_CITIES.find((s) => s.name === selectedSource) || SOURCE_CITIES[0];
  const transportObj = TRANSPORT_MODES.find((t) => t.id === transportMode) || TRANSPORT_MODES[0];

  // Tier Multiplier
  const tierMultiplier = tier === "Budget" ? 0.7 : tier === "Luxury" ? 1.8 : 1.0;
  
  // Dynamic calculation combining destination base price, source weighting, and transport mode weight
  const calculatedBase = Math.round(selectedDest.basePrice * sourceObj.baseMultiplier * selectedDest.defaultDistFactor * transportObj.multiplier);
  const dailyTotal = Math.round(calculatedBase * tierMultiplier);

  // Split percentages
  const stayCost = Math.round(dailyTotal * 0.45);
  const transportCost = Math.round(dailyTotal * 0.20);
  const foodCost = Math.round(dailyTotal * 0.20);
  const activitiesCost = Math.round(dailyTotal * 0.15);

  const grandTotal = dailyTotal * days;

  return (
    <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl dark:shadow-2xl transition-colors">
      
      {/* 1. Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-extrabold text-xl shadow-inner">
            $
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Destination Budget Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Auto-calculated estimates via {transportObj.name} from {selectedSource} to {selectedDest.name.split(",")[0]}
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center gap-2">
          <span>🎚️</span> Route & Transit Aware
        </div>
      </div>

      {/* 2. Top Control Panel: Source, Destination, Transport, Tier, Days */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center">
        
        {/* Source City Dropdown */}
        <div className="md:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
          <label className="block text-[9px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider mb-1">
            📍 STARTING FROM
          </label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
          >
            {SOURCE_CITIES.map((src) => (
              <option key={src.name} value={src.name} className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">
                {src.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Dropdown */}
        <div className="md:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
          <label className="block text-[9px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider mb-1">
            🎯 TARGET DESTINATION
          </label>
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
          >
            {BUDGET_DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id} className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mode of Transport Dropdown */}
        <div className="md:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 focus-within:border-teal-500/60 transition-all">
          <label className="block text-[9px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider mb-1">
            🚀 MODE OF TRANSPORT
          </label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer appearance-none"
          >
            {TRANSPORT_MODES.map((mode) => (
              <option key={mode.id} value={mode.id} className="bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white">
                {mode.name}
              </option>
            ))}
          </select>
        </div>

        {/* Days Input */}
        <div className="md:col-span-3 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
          <label className="block text-[9px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider mb-1">
            🗓️ DAYS
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-transparent text-xs font-extrabold text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

      </div>

      {/* Travel Style Tier Toggle Row */}
      <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
        <label className="block text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">
          ⚡ TRAVEL STYLE / TIER
        </label>
        <div className="flex items-center gap-1 bg-white dark:bg-[#0b1220] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setTier("Budget")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              tier === "Budget"
                ? "bg-teal-400 text-slate-950 shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎒 Budget
          </button>
          <button
            type="button"
            onClick={() => setTier("Standard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              tier === "Standard"
                ? "bg-teal-400 text-slate-950 shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🏨 Standard
          </button>
          <button
            type="button"
            onClick={() => setTier("Luxury")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              tier === "Luxury"
                ? "bg-teal-400 text-slate-950 shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            ✨ Luxury
          </button>
        </div>
      </div>

      {/* 3. Breakdown Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Accommodation */}
        <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>🏠</span> Accommodation / day
            </span>
            <span className="text-emerald-600 dark:text-teal-400 font-extrabold">45%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white bg-white dark:bg-[#0b1220] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            ₹{stayCost.toLocaleString()}
          </div>
        </div>

        {/* Transport */}
        <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>🚖</span> Transport / day
            </span>
            <span className="text-sky-600 dark:text-sky-400 font-extrabold">20%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white bg-white dark:bg-[#0b1220] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            ₹{transportCost.toLocaleString()}
          </div>
        </div>

        {/* Food & Dining */}
        <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>🍲</span> Food & Dining / day
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-extrabold">20%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white bg-white dark:bg-[#0b1220] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            ₹{foodCost.toLocaleString()}
          </div>
        </div>

        {/* Activities */}
        <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>🎟️</span> Activities / day
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-extrabold">15%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white bg-white dark:bg-[#0b1220] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
            ₹{activitiesCost.toLocaleString()}
          </div>
        </div>

      </div>

      {/* 4. Visual Expense Share Progress Bar */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center text-xs font-black">
          <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
            ⏰ VISUAL EXPENSE SHARE
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[10px]">100% TOTAL SHARE</span>
        </div>

        {/* Segmented Color Bar */}
        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden flex gap-0.5">
          <div className="h-full bg-emerald-500 dark:bg-emerald-400 w-[45%]" />
          <div className="h-full bg-sky-500 dark:bg-sky-400 w-[20%]" />
          <div className="h-full bg-amber-500 dark:bg-amber-400 w-[20%]" />
          <div className="h-full bg-purple-500 dark:bg-purple-400 w-[15%]" />
        </div>

        {/* Color Key Legends */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-extrabold text-slate-600 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
            <span>Stay (45%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-sky-400 inline-block" />
            <span>Transport (20%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-400 inline-block" />
            <span>Food (20%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 inline-block" />
            <span>Activities (15%)</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Grand Total Banner */}
      <div className="bg-teal-50/50 dark:bg-[#06121a] border border-teal-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] font-black uppercase text-teal-700 dark:text-teal-400 tracking-wider">
            ⚡ ESTIMATED TOTAL ({selectedSource} ➔ {selectedDest.name.toUpperCase()}) ({days} DAYS)
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            ₹{grandTotal.toLocaleString()}
          </div>
        </div>

        <div className="sm:text-right">
          <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            DAILY AVERAGE ({tier.toUpperCase()} TIER)
          </span>
          <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
            ₹{dailyTotal.toLocaleString()} / day
          </div>
        </div>
      </div>

    </div>
  );
}