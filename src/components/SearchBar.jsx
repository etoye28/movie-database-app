import React, { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ onSearch }){
  const [q, setQ] = useState("");
  const deb = useDebounce(q, 350);
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!deb || deb.length < 1) { setSuggestions([]); return; }
    let canceled = false;
    searchMovies(deb, 1).then(res => {
      if (canceled) return;
      setSuggestions(res.data.results.slice(0,6));
      setShow(true);
    }).catch(()=> setSuggestions([]));
    return ()=> canceled = true;
  }, [deb]);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e)=> setQ(e.target.value)}
        onKeyDown={(e)=> { if (e.key === "Enter") onSearch(q); }}
        onFocus={()=> q && setShow(true)}
        placeholder="Search movies..."
        className="w-full rounded-lg border px-4 py-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      />
      {show && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded shadow z-20 overflow-hidden">
          {suggestions.map(s => (
            <div key={s.id} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3" 
                 onClick={() => { onSearch(s.title); setShow(false); setQ(s.title); }}>
              <img src={s.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE}/w92${s.poster_path}` : ""} alt="" className="w-10 h-14 object-cover rounded" />
              <div className="text-sm">
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.release_date?.slice(0,4)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
