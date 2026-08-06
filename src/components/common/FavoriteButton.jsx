import React from "react";
import { FiHeart } from "react-icons/fi";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoriteButton({ destination }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(destination.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(destination);
      }}
      className={`w-9 h-9 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer shadow-lg ${
        active
          ? "bg-rose-500 border-rose-600 text-white"
          : "bg-slate-900/80 border-slate-700 text-slate-300 hover:text-rose-400"
      }`}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      <FiHeart className={`text-sm ${active ? "fill-current" : ""}`} />
    </button>
  );
}