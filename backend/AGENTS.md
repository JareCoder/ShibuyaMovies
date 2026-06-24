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
- `routes/`: Express route definitions mapping URLs to controllers.

## Key Patterns
- **Authentication**: There is no standard user authentication (e.g., JWT, sessions with passwords). Instead, the frontend sends a randomly generated UUID (stored in a cookie) which the backend uses to attribute actions (adding movies, voting, deleting) to a specific "user".
- **Execution**: During development, the app is run using `tsx` (`npm run dev`). For production, it is compiled using `tsc` (`npm run build`) and typically run with PM2.
