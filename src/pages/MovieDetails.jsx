
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, imageUrl } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { add, remove, isFav } = useFavorites();

  useEffect(() => {
    getMovieDetails(id)
      .then((r) => setMovie(r.data))
      .catch(() => setError("Failed to load"));
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const cast = movie.credits?.cast?.slice(0, 12) || [];

  return (
    <div className="space-y-10">
      {/* Main movie info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="mx-auto">
          <img
            src={imageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full max-w-sm"
          />

          <div className="mt-4 text-center md:text-left">
            <button
              onClick={() =>
                isFav(movie.id)
                  ? remove(movie.id)
                  : add({
                      id: movie.id,
                      title: movie.title,
                      poster_path: movie.poster_path,
                      release_date: movie.release_date,
                    })
              }
              className="px-4 py-2 rounded border mt-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isFav(movie.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">
            {movie.title}{" "}
            <span className="text-sm text-gray-500">
              ({movie.release_date?.slice(0, 4)})
            </span>
          </h1>
          <div className="mt-2 text-sm text-gray-500">
            {movie.genres.map((g) => g.name).join(" • ")}
          </div>
          <div className="mt-4 leading-relaxed">{movie.overview}</div>

          {trailer && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2 text-xl">Trailer</h3>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  className="w-full  h-full rounded-lg shadow"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>

{/* Cast */}
<section>
  <h3 className="font-semibold mb-3 text-xl">Cast</h3>
  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
    <div className="flex gap-4 pb-3">
      {cast.map((c) => (
        <div
          key={c.cast_id}
          className="w-28 flex-none text-center sm:text-left"
        >
              <img
                src={
                  c.profile_path
                    ? imageUrl(c.profile_path, "w185")
                    : "/avatar-placeholder.png"
                }
                className="w-full h-36 object-cover rounded-lg shadow"
                alt={c.name}
              />

          <div className="text-sm mt-1">{c.name}</div>
          <div className="text-xs text-gray-500">{c.character}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      
    
  
      {/* Recommendations */}
      <section>
        <h3 className="font-semibold mb-3 text-xl">You May Also Like</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movie.recommendations?.results
            ?.slice(0, 10)
            .map((r) => (
              <MovieCard key={r.id} movie={r} />
            ))}
        </div>
      </section>
    </div>
  );
}
