import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherBadge from "../components/common/WeatherBadge";
import { FiTrash2, FiArrowRight, FiHeart } from "react-icons/fi";

const INITIAL_FAVORITES = [
  {
    id: "goa",
    name: "Goa",
    category: "Beaches",
    price: 1800,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Pristine beaches, Portuguese colonial heritage, spice plantations, and vibrant coastal culture."
  },
  {
    id: "manali",
    name: "Manali",
    category: "Mountains",
    price: 2500,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    description: "Snow capped Himalayan peaks, cedar forests, adventure sports, and ancient wooden temples."
  }
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const navigate = useNavigate();

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a12] text-slate-900 dark:text-white pt-24 pb-20 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Your Favorite Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Quickly access and build itineraries for the destinations you have bookmarked.
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((dest) => (
              <div
                key={dest.id}
                className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800/90 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:border-teal-400/50"
              >
                {/* Image Header */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Weather Badge */}
                  <div className="absolute top-3 left-3">
                    <WeatherBadge destinationId={dest.id} />
                  </div>

                  {/* Remove Favorite Button */}
                  <button
                    type="button"
                    onClick={() => removeFavorite(dest.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-lg"
                    title="Remove from favorites"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-4 text-xs font-black text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700">
                    ₹{dest.price.toLocaleString()} / day
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      {dest.category}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {dest.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => navigate(`/planner?dest=${dest.id}`)}
                    className="w-full py-3.5 bg-slate-100 dark:bg-[#070b14] hover:bg-teal-400 hover:text-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-black text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Build Itinerary</span>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-[#0b1220]/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-2xl flex items-center justify-center mx-auto">
              <FiHeart />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">No Favorite Destinations Yet</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Explore destinations and bookmark your top spots to access them quickly here.
            </p>
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="mt-4 px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Explore Map <FiArrowRight />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}