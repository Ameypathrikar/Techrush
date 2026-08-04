import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";
import { FiHeart, FiTrash2, FiArrowRight, FiMapPin } from "react-icons/fi";

export default function Favorites() {
  // Initialize with default favorite destination IDs
  const [favoriteIds, setFavoriteIds] = useState(["manali", "goa"]);

  const favoriteDestinations = DESTINATIONS.filter((d) =>
    favoriteIds.includes(d.id)
  );

  const handleRemove = (id) => {
    setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Header with High-Contrast Text */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
          <FiHeart className="text-teal-600 dark:text-teal-400" />
          <span>Bookmarked Escapes</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Your Favorite Destinations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Quickly access and build itineraries for the destinations you have bookmarked.
        </p>
      </div>

      {/* Empty State */}
      {favoriteDestinations.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">
            <FiHeart />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Favorites Saved Yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse the explore page to bookmark destinations for easy access.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-teal-500/20"
          >
            <span>Explore Destinations</span>
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Badge & Trash Button */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Weather Pill */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-slate-200 text-[11px] font-semibold">
                    🌤️ {dest.weather?.temp} ({dest.weather?.condition})
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-950/90 hover:bg-rose-500 dark:hover:bg-rose-500 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm"
                    title="Remove from favorites"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                      {dest.type}
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ₹{dest.costPerDay} <span className="font-normal text-slate-500 dark:text-slate-400">/ day</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to="/planner"
                  className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-teal-500 hover:text-slate-950 dark:hover:bg-teal-500 dark:hover:text-slate-950 text-slate-900 dark:text-slate-100 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200 dark:border-slate-700/60"
                >
                  <span>Build Itinerary</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}