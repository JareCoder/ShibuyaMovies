# ShibuyaMovies Backend - Agent Context

## Project Overview
This is the backend API for ShibuyaMovies, a simple application to suggest and vote for movie night options. It provides the necessary endpoints for the React frontend.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: SQLite (stored in `movies.db` at the project root)
- **ORM**: Sequelize

## Directory Structure (`/backend/src`)
- `main.ts`: The entry point of the Express application.
- `config/`: Configuration files (e.g., database connection, environment variables).
- `models/`: Sequelize data models defining the database schema.
- `controllers/`: Logic for handling incoming API requests.
- `middleware/`: Middleware logic (e.g., password checking/authentication).
- `routes/`: Express route definitions mapping URLs to controllers.

## Key Patterns
- **Authentication & Security**: 
  - There is no individual user authentication (accounts/passwords). The frontend generates a UUID (stored in a cookie) which is used to track likes/dislikes and delete authorization.
  - A global access password can be configured via `APP_PASSWORD` in the `.env` file. If configured, all API routes run through the `checkPassword` middleware which verifies the `X-App-Password` custom header using Node's `crypto.timingSafeEqual` to prevent timing attacks.
- **Input Validation & Stripping**: Feature toggles for watch links (`ALLOW_LINKS`) and trailers (`ALLOW_TRAILERS`) are also validated on the backend. When a new movie is created, the backend strips out disabled fields (`link` or `trailer`) from the payload if their respective settings are disabled.
- **Execution**: During development, the app is run using `tsx` (`npm run dev`). For production/deployment, it can be compiled using `tsc` (`npm run build`) and run via PM2, or containerized using the provided Dockerfile and Docker Compose.
- **Dockerization**: The backend is dockerized via a `Dockerfile` inside the `backend` directory. For deployment, `docker-compose.yml` (in the project root) orchestrates running this container. It automatically reads environment variables from `.env` in the root (matching ports automatically to `API_PORT`) and mounts `movies.db` for persistence.

