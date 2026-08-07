import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("tripnest_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tripnest_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const normalizeId = (dest) => {
    if (!dest) return "";
    if (typeof dest === "string") return dest.toLowerCase().trim();
    const val = dest.id || dest.name || "";
    return val.toLowerCase().split(",")[0].trim();
  };

  const toggleFavorite = (dest) => {
    setFavorites((prev) => {
      const targetKey = normalizeId(dest);
      const exists = prev.some((item) => normalizeId(item) === targetKey);
      
      if (exists) {
        return prev.filter((item) => normalizeId(item) !== targetKey);
      } else {
        const newObj = typeof dest === "object" ? dest : { id: targetKey, name: dest };
        return [...prev, newObj];
      }
    });
  };

  const isFavorite = (dest) => {
    const targetKey = normalizeId(dest);
    return favorites.some((item) => normalizeId(item) === targetKey);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}