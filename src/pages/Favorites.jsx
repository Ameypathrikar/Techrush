import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteCard from "../components/favorites/FavoriteCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Your Favorite Destinations</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
          Quickly access and build itineraries for the destinations you have bookmarked.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl p-16 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-2xl flex items-center justify-center mx-auto">
            ❤️
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">No Favorite Destinations Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Explore destinations and tap the heart icon to save your favorite spots here for instant trip planning.
          </p>
          <Link
            to="/explore"
            className="inline-block px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg shadow-teal-500/20"
          >
            Explore Destinations 🚀
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dest) => (
            <FavoriteCard key={dest.id || dest.name} destination={dest} />
          ))}
        </div>
      )}
    </div>
  );
}