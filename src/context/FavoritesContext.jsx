import React, { createContext, useContext, useEffect, useState } from "react";
const FavoritesContext = createContext();
export function useFavorites() { return useContext(FavoritesContext); }

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites_v1")) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("favorites_v1", JSON.stringify(favorites));
  }, [favorites]);

  const add = (movie) => {
    if (!favorites.find(m => m.id === movie.id)) setFavorites(prev => [movie, ...prev]);
  };
  const remove = (id) => setFavorites(prev => prev.filter(m => m.id !== id));
  const isFav = (id) => favorites.some(m => m.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}
