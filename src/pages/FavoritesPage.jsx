import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage(){
  const { favorites, remove } = useFavorites();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      {favorites.length === 0 ? (
        <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded">No favorites yet — add by clicking a movie and pressing "Add to Favorites".</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favorites.map(m => (
            <div key={m.id}>
              <MovieCard movie={m} />
              <button onClick={()=> remove(m.id)} className="mt-2 px-3 py-1 rounded border">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
