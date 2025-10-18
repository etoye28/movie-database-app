import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useTheme } from "../context/ThemeContext";
import { HeartIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { dark, toggle } = useTheme();
  const nav = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          MovieDB
        </Link>

        {/* Search bar — now full width on mobile */}
        <div className="flex-1 min-w-[200px] w-full sm:w-auto order-3 sm:order-none">
          <SearchBar
            onSearch={(q) => nav(`/search?q=${encodeURIComponent(q)}`)}
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/favorites"
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HeartIcon className="w-6 h-6" /> Favorites
          </Link>
          <button
            onClick={toggle}
            aria-label="toggle theme"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {dark ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
