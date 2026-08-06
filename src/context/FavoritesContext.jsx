import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("tripnest_favorites");
      return saved ? JSON.parse(saved) : [
        {
          id: "goa",
          name: "Goa",
          category: "Beaches",
          price: 1800,
          image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
          description: "Pristine beaches, Portuguese colonial heritage, and vibrant coastal culture."
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
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tripnest_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (dest) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === dest.id);
      if (exists) {
        return prev.filter((item) => item.id !== dest.id);
      } else {
        return [...prev, dest];
      }
    });
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}