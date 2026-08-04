import React, { useState } from "react";
import { DESTINATIONS } from "../data/destinations";
import { FiColumns, FiCheck, FiX, FiSun, FiUsers, FiDollarSign, FiStar } from "react-icons/fi";

export default function Compare() {
  const [selectedDest1, setSelectedDest1] = useState("manali");
  const [selectedDest2, setSelectedDest2] = useState("goa");

  const dest1 = DESTINATIONS.find((d) => d.id === selectedDest1) || DESTINATIONS[0];
  const dest2 = DESTINATIONS.find((d) => d.id === selectedDest2) || DESTINATIONS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
          <FiColumns className="text-teal-600 dark:text-teal-400" />
          <span>Side-by-Side Analysis Engine</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Compare Destinations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Evaluate weather, estimated daily budgets, crowd levels, and top attractions side-by-side[cite: 2].
        </p>
      </div>

      {/* Selectors Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selector 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Select Destination A</label>
          <select
            value={selectedDest1}
            onChange={(e) => setSelectedDest1(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {d.name} ({d.type})
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Select Destination B</label>
          <select
            value={selectedDest2}
            onChange={(e) => setSelectedDest2(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {d.name} ({d.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table View */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/4">Feature</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 w-3/8">{dest1.name}</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400 w-3/8">{dest2.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              
              {/* Preview Image */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Preview</td>
                <td className="p-4">
                  <img src={dest1.image} alt={dest1.name} className="w-full h-32 sm:h-40 object-cover rounded-2xl border border-slate-200 dark:border-slate-800" />
                </td>
                <td className="p-4">
                  <img src={dest2.image} alt={dest2.name} className="w-full h-32 sm:h-40 object-cover rounded-2xl border border-slate-200 dark:border-slate-800" />
                </td>
              </tr>

              {/* Category */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Category</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{dest1.type}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{dest2.type}</td>
              </tr>

              {/* Live Weather */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Live Weather</td>
                <td className="p-4">🌤️ {dest1.weather?.temp} ({dest1.weather?.condition})</td>
                <td className="p-4">🌤️ {dest2.weather?.temp} ({dest2.weather?.condition})</td>
              </tr>

              {/* Budget */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Est. Daily Budget</td>
                <td className="p-4 font-black text-teal-600 dark:text-teal-400">₹{dest1.costPerDay} / day</td>
                <td className="p-4 font-black text-teal-600 dark:text-teal-400">₹{dest2.costPerDay} / day</td>
              </tr>

              {/* Traffic Level */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Traffic / Crowd Level</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    dest1.trafficStatus === "Overcrowded" ? "bg-rose-500" : dest1.trafficStatus === "Busy" ? "bg-amber-500" : "bg-emerald-500"
                  }`}>
                    {dest1.trafficStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    dest2.trafficStatus === "Overcrowded" ? "bg-rose-500" : dest2.trafficStatus === "Busy" ? "bg-amber-500" : "bg-emerald-500"
                  }`}>
                    {dest2.trafficStatus}
                  </span>
                </td>
              </tr>

              {/* User Rating */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">User Rating</td>
                <td className="p-4 font-bold text-amber-500">★ {dest1.rating} / 5.0</td>
                <td className="p-4 font-bold text-amber-500">★ {dest2.rating} / 5.0</td>
              </tr>

              {/* Top Attractions */}
              <tr>
                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Top Attractions</td>
                <td className="p-4">
                  <ul className="space-y-1">
                    {dest1.attractions?.map((a, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <FiCheck className="text-teal-500 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4">
                  <ul className="space-y-1">
                    {dest2.attractions?.map((a, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <FiCheck className="text-teal-500 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}