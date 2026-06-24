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
- `components/`: Reusable React components (including `AddMovieModal` and `PasswordModal`).
- `services/`: API integration and HTTP request handlers using Axios (including `MoviesListService` and `UserContext`).
- `types/`: TypeScript definitions and interfaces.
- `style/` & `*.css`: Standard CSS styling (such as `App.css` and dialog/modal styles).

## Key Patterns
- **API Authentication Headers**: The API HTTP requests inside `MoviesListService.tsx` pull the stored password from `localStorage` (`app_password`) and append it as `X-App-Password` request header.
- **Access Restricting Modal**: If any HTTP request triggers a `401 Unauthorized` response code, `App.tsx` intercepts it and opens the custom `PasswordModal` component. This modal prompts for the access key, writes it to `localStorage`, and retries loading.
- **Environment & Feature Toggles**: The app uses `vite.config.ts` loaded environment variables (`ALLOW_LINKS` and `ALLOW_TRAILERS`) to toggle watch links and trailer links conditionally. Custom keys are exposed by setting `envPrefix` in Vite config.
- To run locally, use `npm run dev`. To build, use `npm run build`.
