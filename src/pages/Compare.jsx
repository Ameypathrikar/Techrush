import React, { useState } from "react";
import { DESTINATIONS } from "../data/destinations";
import { FiCheck, FiX, FiLayers } from "react-icons/fi";

export default function Compare() {
  const [dest1Id, setDest1Id] = useState(DESTINATIONS[0]?.id || "");
  const [dest2Id, setDest2Id] = useState(DESTINATIONS[1]?.id || "");

  const dest1 = DESTINATIONS.find((d) => d.id === dest1Id) || DESTINATIONS[0];
  const dest2 = DESTINATIONS.find((d) => d.id === dest2Id) || DESTINATIONS[1];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-2">
          <FiLayers className="text-teal-600" />
          <span>Destination Comparison Tool</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Compare Destinations</h1>
        <p className="text-sm text-slate-500 mt-1">
          Evaluate weather, estimated daily budgets, crowd levels, and top attractions side-by-side.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Select First Destination
          </label>
          <select
            value={dest1Id}
            onChange={(e) => setDest1Id(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name} ({dest.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
            Select Second Destination
          </label>
          <select
            value={dest2Id}
            onChange={(e) => setDest2Id(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name} ({dest.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 p-4 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div>Feature</div>
          <div className="text-teal-700 font-extrabold">{dest1?.name}</div>
          <div className="text-teal-700 font-extrabold">{dest2?.name}</div>
        </div>

        <div className="divide-y divide-slate-100 text-xs sm:text-sm">
          {/* Images */}
          <div className="grid grid-cols-3 p-4 items-center">
            <div className="font-bold text-slate-500">Preview</div>
            <div className="pr-4">
              <img src={dest1?.image} alt={dest1?.name} className="w-full h-32 object-cover rounded-xl" />
            </div>
            <div className="pr-4">
              <img src={dest2?.image} alt={dest2?.name} className="w-full h-32 object-cover rounded-xl" />
            </div>
          </div>

          {/* Category Type */}
          <div className="grid grid-cols-3 p-4 items-center bg-slate-50/50">
            <div className="font-bold text-slate-500">Category</div>
            <div className="font-semibold text-slate-800">{dest1?.type}</div>
            <div className="font-semibold text-slate-800">{dest2?.type}</div>
          </div>

          {/* Weather & Season */}
          <div className="grid grid-cols-3 p-4 items-center">
            <div className="font-bold text-slate-500">Live Weather</div>
            <div className="font-semibold text-slate-800">
              🌤️ {dest1?.weather?.temp} ({dest1?.weather?.condition})
            </div>
            <div className="font-semibold text-slate-800">
              🌤️ {dest2?.weather?.temp} ({dest2?.weather?.condition})
            </div>
          </div>

          {/* Daily Budget */}
          <div className="grid grid-cols-3 p-4 items-center bg-slate-50/50">
            <div className="font-bold text-slate-500">Est. Daily Budget</div>
            <div className="font-bold text-teal-600">₹{dest1?.costPerDay} / day</div>
            <div className="font-bold text-teal-600">₹{dest2?.costPerDay} / day</div>
          </div>

          {/* Traffic / Crowd */}
          <div className="grid grid-cols-3 p-4 items-center">
            <div className="font-bold text-slate-500">Traffic / Crowd Level</div>
            <div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white ${
                dest1?.trafficStatus === "Overcrowded" ? "bg-rose-500" : dest1?.trafficStatus === "Busy" ? "bg-amber-500" : "bg-emerald-500"
              }`}>
                {dest1?.trafficStatus}
              </span>
            </div>
            <div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white ${
                dest2?.trafficStatus === "Overcrowded" ? "bg-rose-500" : dest2?.trafficStatus === "Busy" ? "bg-amber-500" : "bg-emerald-500"
              }`}>
                {dest2?.trafficStatus}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="grid grid-cols-3 p-4 items-center bg-slate-50/50">
            <div className="font-bold text-slate-500">User Rating</div>
            <div className="font-bold text-amber-500">★ {dest1?.rating} / 5.0</div>
            <div className="font-bold text-amber-500">★ {dest2?.rating} / 5.0</div>
          </div>

          {/* Attractions */}
          <div className="grid grid-cols-3 p-4 items-start">
            <div className="font-bold text-slate-500">Top Attractions</div>
            <ul className="space-y-1 text-xs text-slate-600">
              {dest1?.attractions?.map((attr, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <FiCheck className="text-teal-500" /> {attr}
                </li>
              ))}
            </ul>
            <ul className="space-y-1 text-xs text-slate-600">
              {dest2?.attractions?.map((attr, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <FiCheck className="text-teal-500" /> {attr}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}