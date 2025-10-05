import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, imageUrl } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function MovieDetails(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { add, remove, isFav } = useFavorites();

  useEffect(() => {
    getMovieDetails(id).then(r => setMovie(r.data)).catch(e=> setError("Failed to load"));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos?.results?.find(v => v.site === "YouTube" && v.type === "Trailer");
  const cast = movie.credits?.cast?.slice(0,8) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <img src={imageUrl(movie.poster_path, "w500")} alt={movie.title} className="rounded shadow" />
        <div className="mt-3">
          <button onClick={() => isFav(movie.id) ? remove(movie.id) : add({id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date})}
                  className="px-4 py-2 rounded border mt-2">
            {isFav(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">{movie.title} <span className="text-sm text-gray-500">({movie.release_date?.slice(0,4)})</span></h1>
        <div className="mt-2 text-sm text-gray-500">{movie.genres.map(g=>g.name).join(" • ")}</div>
        <div className="mt-4">{movie.overview}</div>

        {trailer && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Trailer</h3>
            <div className="aspect-video">
              <iframe src={`https://www.youtube.com/embed/${trailer.key}`} title="Trailer" className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Cast</h3>
          <div className="flex gap-4 overflow-x-auto">
            {cast.map(c => (
              <div key={c.cast_id} className="w-28 flex-none">
                <img src={c.profile_path ? imageUrl(c.profile_path, "w185") : "/avatar-placeholder.png"} className="w-full h-36 object-cover rounded" alt={c.name} />
                <div className="text-sm mt-1">{c.name}</div>
                <div className="text-xs text-gray-500">{c.character}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">You May Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movie.recommendations.results.slice(0,8).map(r=> <MovieCard key={r.id} movie={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
