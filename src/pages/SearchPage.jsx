/*
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

export default function SearchPage(){
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres] = useState([]); // optional to fetch genre list
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!q) { setMovies([]); return; }
    searchMovies(q, page).then(r => {
      setMovies(r.data.results);
      setTotalPages(Math.min(500, r.data.total_pages));
    }).catch(()=> setMovies([]));
  }, [q, page]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Results for "{q}"</h2>
      <Filters genres={genres} selectedGenre={genre} setGenre={setGenre} setSortBy={setSortBy} sortBy={sortBy} year={year} setYear={setYear} />
      {movies.length === 0 ? <div>No results found</div> : <MovieList movies={movies} />}
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
*/


import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, discoverMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import axios from "axios";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState("");

  // ✅ Fetch all genres once
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_TMDB_BASE}/genre/movie/list`, {
        params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: "en-US" },
      })
      .then((res) => setGenres(res.data.genres || []))
      .catch(() => setGenres([]));
  }, []);

  // ✅ Load movies — if user typed search → use searchMovies; else discoverMovies with filters
  useEffect(() => {
    const load = async () => {
      try {
        let res;
        if (q) {
          res = await searchMovies(q, page);
        } else {
          res = await discoverMovies({
            page,
            sort_by: sortBy,
            with_genres: genre || undefined,
            primary_release_year: year || undefined,
          });
        }
        setMovies(res.data.results);
        setTotalPages(Math.min(500, res.data.total_pages));
      } catch {
        setMovies([]);
      }
    };
    load();
  }, [q, page, sortBy, genre, year]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {q ? `Search Results for "${q}"` : "Discover Movies"}
      </h2>

      {movies.length === 0 ? (
        <div>No results found</div>
      ) : (
        <MovieList movies={movies} />
      )}

      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}
