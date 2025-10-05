
<!--
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
-->

# Movie Database App

React + Vite + Tailwind app using TMDB API. Features:
- Search with suggestions
- Movie details (plot, cast, trailer)
- Trending & top-rated sections
- Favorites (localStorage)
- Pagination, sorting, filters
- Dark mode

## Local setup
1. copy `.env.example` -> `.env` and fill `VITE_TMDB_API_KEY`
2. `npm install`
3. `npm run dev`

## Deploy
Deployed on Vercel/Netlify (set env vars in dashboard).
