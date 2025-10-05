import React from "react";
export default function Filters({ genres=[], selectedGenre, setGenre, sortBy, setSortBy, year, setYear }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <select value={selectedGenre||""} onChange={e=> setGenre(e.target.value)} className="rounded border p-2 bg-white dark:bg-gray-800">
        <option value="">All Genres</option>
        {genres.map(g => <option value={g.id} key={g.id}>{g.name}</option>)}
      </select>
      <select value={sortBy} onChange={e=> setSortBy(e.target.value)} className="rounded border p-2 bg-white dark:bg-gray-800">
        <option value="popularity.desc">Sort: Popularity</option>
        <option value="release_date.desc">Sort: Newest</option>
        <option value="release_date.asc">Sort: Oldest</option>
      </select>
      <input type="number" placeholder="Year" value={year||""} onChange={e=> setYear(e.target.value)} className="rounded border p-2 bg-white dark:bg-gray-800 w-28" />
    </div>
  );
}
