import React, { useEffect, useState } from "react";
import { getTrending, discoverMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";

export default function Home(){
  const [trending, setTrending] = useState([]);
  const [topAction, setTopAction] = useState([]);
  const [topRomance, setTopRomance] = useState([]);

  useEffect(() => {
    getTrending().then(r=> setTrending(r.data.results.slice(0,8))).catch(()=>{});
    discoverMovies({ sort_by: "vote_average.desc", with_genres: 28, "vote_count.gte": 500 }).then(r=> setTopAction(r.data.results.slice(0,6)));
    discoverMovies({ sort_by: "vote_average.desc", with_genres: 10749, "vote_count.gte": 300 }).then(r=> setTopRomance(r.data.results.slice(0,6)));
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4">
            {trending.map(m => <div key={m.id} className="w-56 flex-shrink-0"><MovieCard movie={m} /></div>)}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Top Action</h3>
        <MovieList movies={topAction} />
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Top Romance</h3>
        <MovieList movies={topRomance} />
      </section>
    </div>
  );
}
