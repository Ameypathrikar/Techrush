import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";
import { FiHeart, FiTrash2, FiArrowRight, FiMapPin } from "react-icons/fi";

export default function Favorites() {
  // Mock saved favorites state (defaults to first two destinations for demo)
  const [favorites, setFavorites] = useState(DESTINATIONS.slice(0, 2));

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold mb-2">
          <FiHeart className="text-rose-500 fill-rose-500" />
          <span>Saved Places</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Your Favorite Destinations</h1>
        <p className="text-sm text-slate-500 mt-1">
          Quickly access and build itineraries for the destinations you have bookmarked.
        </p>
      </div>

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-xl">
            <FiHeart />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Saved Destinations Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore destinations and click the heart icon on any place to save it here for later planning.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Explore Destinations</span>
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeFavorite(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-rose-500 text-rose-500 hover:text-white shadow-sm transition-colors"
                    title="Remove from favorites"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold">
                    🌤️ {dest.weather?.temp} ({dest.weather?.condition})
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600">
                      {dest.type}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      ₹{dest.costPerDay} <span className="font-normal text-slate-400">/ day</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{dest.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to="/planner"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
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