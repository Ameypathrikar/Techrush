import React, { useState, useEffect } from "react";
import { DESTINATIONS } from "../../data/destinations";

// Inline Weather Fetching Component so no extra files are needed
function WeatherBadge({ lat, lng }) {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    if (lat && lng) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.current_weather) {
            setTemp(Math.round(data.current_weather.temperature));
          }
        })
        .catch(() => setTemp(26));
    }
  }, [lat, lng]);

  return (
    <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1">
      <span>🌤️</span>
      <span>{temp !== null ? `${temp}°C` : "26°C"}</span>
    </span>
  );
}

// Map prices to destinations if missing in object
const DEFAULT_PRICES = {
  goa: 1800,
  manali: 2500,
  jaipur: 2200,
  ladakh: 4500,
  udaipur: 3200,
  munnar: 2100
};

export default function TrendingDestinations() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (activeFilter === "cool") return dest.category === "MOUNTAINS";
    if (activeFilter === "pleasant") return dest.category === "HERITAGE" || dest.category === "BEACHES";
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-8 py-6">
      
      {/* Section Header & Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">
            WEATHER-BASED DISCOVERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Trending Seasonal Destinations
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Explore destinations matching current weather conditions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-teal-400 text-slate-950 font-black"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            ↗ All Seasons
          </button>
          <button
            onClick={() => setActiveFilter("cool")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === "cool"
                ? "bg-teal-400 text-slate-950 font-black"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            🌧️ Cool / Snowy
          </button>
          <button
            onClick={() => setActiveFilter("pleasant")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === "pleasant"
                ? "bg-teal-400 text-slate-950 font-black"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
            }`}
          >
            🌤️ Pleasant
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDestinations.map((item) => {
          const itemPrice = item.price || item.cost || DEFAULT_PRICES[item.id] || 2000;
          return (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-teal-500/40 transition-all duration-300"
            >
              {/* Card Image & Badges */}
              <div className="relative h-52 bg-slate-950 overflow-hidden">
                <img
                  src={item.heroImage || item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                
                {/* Live Weather Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <WeatherBadge lat={item.lat || 20.5937} lng={item.lng || 78.9629} />
                </div>

                {/* Crowd Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 block border-2 border-slate-950 shadow-md"></span>
                </div>
              </div>

              {/* Content & Fixed Price Header */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">{item.name}</h3>
                    <span className="text-xs font-black text-teal-400">
                      ₹{itemPrice} / day
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <button className="w-full py-2.5 bg-slate-950 hover:bg-teal-400 hover:text-slate-950 border border-slate-800 text-slate-200 font-extrabold text-xs rounded-2xl transition-all cursor-pointer">
                  Create Itinerary →
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}