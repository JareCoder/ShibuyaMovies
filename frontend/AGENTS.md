# ShibuyaMovies Frontend - Agent Context

## Project Overview
This is the frontend for ShibuyaMovies, a simple web application used to suggest and vote for movie night options.

## Tech Stack
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **State/Auth Management**: No formal user accounts are used. Instead, a randomly generated UUID is stored in a cookie (`js-cookie`) to identify users. This ID is used to track permissions (e.g., who can delete which posts) and manage likes/dislikes.

## Directory Structure (`/frontend/src`)
- `components/`: Reusable React components.
- `services/`: API integration and HTTP request handlers using Axios.
- `types/`: TypeScript definitions and interfaces.
- `style/` & `*.css`: Standard CSS styling.

## Key Patterns
- The app relies on environment variables (like `VITE_API_URL` and `VITE_POSTER_URL`) for configuration.
- To run locally, use `npm run dev`. To build, use `npm run build`.
