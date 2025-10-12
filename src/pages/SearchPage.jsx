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
