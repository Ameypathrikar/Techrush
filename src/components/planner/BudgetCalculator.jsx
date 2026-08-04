import React, { useState, useEffect } from "react";
import { 
  FiDollarSign, 
  FiMapPin, 
  FiLayers, 
  FiPieChart, 
  FiZap, 
  FiHome, 
  FiTruck, 
  FiCoffee, 
  FiActivity,
  FiSliders
} from "react-icons/fi";
import { DESTINATIONS } from "../../data/destinations";

export default function BudgetCalculator() {
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0]?.id || "manali");
  const [tier, setTier] = useState("mid"); // 'low', 'mid', 'luxury'
  const [days, setDays] = useState(3);
  const [customMode, setCustomMode] = useState(false);

  // Active destination object
  const activeDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Base daily cost multiplier based on tier
  // Low = 60% of base cost, Mid = 100% of base cost, Luxury = 220% of base cost
  const tierMultipliers = {
    low: { stay: 0.35, transport: 0.15, food: 0.30, activities: 0.20 },
    mid: { stay: 0.45, transport: 0.20, food: 0.20, activities: 0.15 },
    luxury: { stay: 0.55, transport: 0.20, food: 0.15, activities: 0.10 }
  };

  const currentMultiplier = tier === "low" ? 0.6 : tier === "luxury" ? 2.2 : 1.0;
  const baseDaily = Math.round((activeDest?.costPerDay || 2000) * currentMultiplier);

  // Category breakdowns
  const [stay, setStay] = useState(Math.round(baseDaily * tierMultipliers[tier].stay));
  const [transport, setTransport] = useState(Math.round(baseDaily * tierMultipliers[tier].transport));
  const [food, setFood] = useState(Math.round(baseDaily * tierMultipliers[tier].food));
  const [activities, setActivities] = useState(Math.round(baseDaily * tierMultipliers[tier].activities));

  // Recalculate breakdown when destination or tier changes
  useEffect(() => {
    if (!customMode) {
      const calculatedBase = Math.round((activeDest?.costPerDay || 2000) * currentMultiplier);
      const mults = tierMultipliers[tier];
      setStay(Math.round(calculatedBase * mults.stay));
      setTransport(Math.round(calculatedBase * mults.transport));
      setFood(Math.round(calculatedBase * mults.food));
      setActivities(Math.round(calculatedBase * mults.activities));
    }
  }, [selectedDestId, tier, customMode]);

  const dailyCost = Number(stay) + Number(transport) + Number(food) + Number(activities);
  const totalCost = dailyCost * Number(days);

  // Percentages for visual chart
  const stayPct = dailyCost > 0 ? Math.round((stay / dailyCost) * 100) : 0;
  const transportPct = dailyCost > 0 ? Math.round((transport / dailyCost) * 100) : 0;
  const foodPct = dailyCost > 0 ? Math.round((food / dailyCost) * 100) : 0;
  const actPct = dailyCost > 0 ? Math.round((activities / dailyCost) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <FiDollarSign className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Destination Budget Engine</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Auto-calculated daily estimates tailored to real location pricing
            </p>
          </div>
        </div>

        {/* Custom Toggle Mode */}
        <button
          onClick={() => setCustomMode(!customMode)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            customMode 
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" 
              : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
          }`}
        >
          <FiSliders />
          <span>{customMode ? "Manual Override ON" : "Auto Estimates"}</span>
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Destination & Tier Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Destination Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <FiMapPin className="text-teal-500" />
              <span>Select Destination</span>
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => {
                setSelectedDestId(e.target.value);
                setCustomMode(false);
              }}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {DESTINATIONS.map((dest) => (
                <option key={dest.id} value={dest.id} className="bg-white dark:bg-slate-900">
                  {dest.name} (Base ~₹{dest.costPerDay}/day)
                </option>
              ))}
            </select>
          </div>

          {/* Travel Tier Options (Low, Mid, Luxury) */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <FiZap className="text-amber-500" />
              <span>Travel Style / Tier</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 h-[46px] items-center">
              {[
                { id: "low", label: "🎒 Budget" },
                { id: "mid", label: "🧳 Standard" },
                { id: "luxury", label: "✨ Luxury" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTier(t.id);
                    setCustomMode(false);
                  }}
                  className={`h-full rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    tier === t.id && !customMode
                      ? "bg-emerald-500 text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <FiLayers className="text-teal-500" />
              <span>Days</span>
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Breakdown Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Accommodation */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <FiHome className="text-emerald-500" /> Accommodation / day
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">{stayPct}%</span>
            </div>
            <input
              type="number"
              value={stay}
              disabled={!customMode}
              onChange={(e) => setStay(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Transport */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <FiTruck className="text-cyan-500" /> Transport / day
              </span>
              <span className="text-cyan-600 dark:text-cyan-400">{transportPct}%</span>
            </div>
            <input
              type="number"
              value={transport}
              disabled={!customMode}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Food & Dining */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <FiCoffee className="text-amber-500" /> Food & Dining / day
              </span>
              <span className="text-amber-600 dark:text-amber-400">{foodPct}%</span>
            </div>
            <input
              type="number"
              value={food}
              disabled={!customMode}
              onChange={(e) => setFood(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Activities */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <FiActivity className="text-purple-500" /> Activities / day
              </span>
              <span className="text-purple-600 dark:text-purple-400">{actPct}%</span>
            </div>
            <input
              type="number"
              value={activities}
              disabled={!customMode}
              onChange={(e) => setActivities(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* VISUAL EXPENSE SHARE BAR */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiPieChart className="text-emerald-500" /> Visual Expense Share
            </span>
            <span>100% Total Share</span>
          </div>

          <div className="h-3 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: `${stayPct}%` }} className="bg-emerald-500 transition-all duration-300" title={`Stay: ${stayPct}%`} />
            <div style={{ width: `${transportPct}%` }} className="bg-cyan-500 transition-all duration-300" title={`Transport: ${transportPct}%`} />
            <div style={{ width: `${foodPct}%` }} className="bg-amber-500 transition-all duration-300" title={`Food: ${foodPct}%`} />
            <div style={{ width: `${actPct}%` }} className="bg-purple-500 transition-all duration-300" title={`Activities: ${actPct}%`} />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Stay ({stayPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" /> Transport ({transportPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Food ({foodPct}%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" /> Activities ({actPct}%)</span>
          </div>
        </div>

        {/* Calculation Summary Banner */}
        <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block mb-1 flex items-center gap-1.5">
              <FiZap className="text-emerald-500" />
              Estimated Total for {activeDest?.name.split(",")[0]} ({days} Days)
            </span>
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              ₹{totalCost.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-emerald-500/30 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
              Daily Average ({tier.toUpperCase()} Tier)
            </span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{dailyCost.toLocaleString("en-IN")} / day
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}