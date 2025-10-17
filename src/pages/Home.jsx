
import React, { useEffect, useState } from "react";
import { getTrending, discoverMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [topAction, setTopAction] = useState([]);
  const [topRomance, setTopRomance] = useState([]);
  const [topAnimation, setTopAnimation] = useState([]); // ✅ Changed from comedy → animation

  useEffect(() => {
    getTrending()
      .then((r) => setTrending(r.data.results.slice(0, 10)))
      .catch(() => {});

    discoverMovies({
      sort_by: "vote_average.desc",
      with_genres: 28,
      "vote_count.gte": 500,
    }).then((r) => setTopAction(r.data.results.slice(0, 10)));

    discoverMovies({
      sort_by: "vote_average.desc",
      with_genres: 10749,
      "vote_count.gte": 300,
    }).then((r) => setTopRomance(r.data.results.slice(0, 10)));

    // ✅ Fetch Top Animation Movies
    discoverMovies({
      sort_by: "vote_average.desc",
      with_genres: 16, // Animation genre ID on TMDB
      "vote_count.gte": 300,
    }).then((r) => setTopAnimation(r.data.results.slice(0, 10)));
  }, []);

  const Section = ({ title, movies }) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <div className="flex gap-4 pb-3">
          {movies.map((m) => (
            <div key={m.id} className="w-44 sm:w-52 flex-shrink-0">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="space-y-8">
      <Section title="Trending This Week" movies={trending} />
      <Section title="Top Action" movies={topAction} />
      <Section title="Top Romance" movies={topRomance} />
      <Section title="Top Animation" movies={topAnimation} /> {/* ✅ Updated title */}
    </div>
  );
}

