import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import WeatherBadge from "../common/WeatherBadge";
import { Link } from "react-router-dom";

export default function FavoriteCard({ destination }) {
  const { toggleFavorite } = useFavorites();

  return (
    <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-colors">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image || destination.bannerImg || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <WeatherBadge destinationId={destination.id} />
        </div>
        <button
          onClick={() => toggleFavorite(destination)}
          className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
          title="Remove from favorites"
        >
          🗑️
        </button>
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <span className="px-3 py-1 bg-teal-400 text-slate-950 font-black text-[10px] uppercase rounded-full tracking-wider">
            {destination.category || "Destination"}
          </span>
          <span className="text-white font-black text-sm bg-slate-950/60 px-3 py-1 rounded-xl backdrop-blur-md">
            ₹{destination.price || 2000} / day
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">{destination.name}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
            {destination.description || "Explore top-rated attractions, scenic viewpoints, and local culinary highlights."}
          </p>
        </div>

        <Link
          to={`/planner?destination=${encodeURIComponent(destination.name)}`}
          className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20"
        >
          <span>✨</span> Build Itinerary
        </Link>
      </div>
    </div>
  );
}