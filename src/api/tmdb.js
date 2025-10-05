import axios from "axios";

const BASE = import.meta.env.VITE_TMDB_BASE;
const KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: BASE,
  params: { api_key: KEY, language: "en-US" },
});

export const imageUrl = (path, size = "w500") =>
  path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE}/${size}${path}` : null;

export const searchMovies = (query, page = 1) =>
  tmdb.get("/search/movie", { params: { query, page, include_adult: false } });

export const getTrending = (timeWindow = "week") =>
  tmdb.get(`/trending/movie/${timeWindow}`);

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos,recommendations" },
  });

export const discoverMovies = (params = {}) =>
  tmdb.get("/discover/movie", { params });

export default tmdb;
