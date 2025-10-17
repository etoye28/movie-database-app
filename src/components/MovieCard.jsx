

import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
    >
    <img
        src={
          movie.poster_path
            ? imageUrl(movie.poster_path, "w500")
            : "/placeholder.png"
        }
        alt={movie.title}
        className="w-full h-64 sm:h-72 object-cover"
      />
      <div className="p-2 sm:p-3">
        <div className="font-semibold text-sm sm:text-base truncate">
          {movie.title}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {movie.release_date?.slice(0, 4)}
        </div>
      </div>
    </Link>
  );
}