# ShibuyaMovies
A simple React Vite app with a Node backend to help us vote for movie night suggestions. Self hosted in Oracle cloud through Nginx.

Users ids are generated into cookies. Why? I don't want to hassle with a proper account / user management, but still wanted to monitor who can delete what posts and how likes and dislikes are calculated. Random generated ID in cookies is good enough for that!

Main view:

<img width="1349" height="891" alt="image" src="https://github.com/user-attachments/assets/2c4a8140-259e-4176-8791-8318cebe4388" />



Add Movie:

<img width="631" height="831" alt="image" src="https://github.com/user-attachments/assets/658973de-03da-4305-9e7c-7f982d565543" />



# How to configure
Copy the .env-example file and rename it to .env. Fill in values:

- API_PORT: The port the API will be opened to.
- API_ROOT: Don't touch if you don't know what you are doing.
- API_URL: The URL where the API is hosted in.
- VITE_API_URL: Frontend connects to this. No need to touch.
- VITE_POSTER_URL: A backup poster image URL that is used, if no URL is provided when adding a movie.
- ALLOW_LINKS: (Optional) Set to `true` to enable optional watch links for movies.
- ALLOW_TRAILERS: (Optional) Set to `false` to disable trailer links (enabled by default).
- APP_PASSWORD: (Optional) Set a password decryption key to restrict access to the movie list and voting database. If left empty/commented out, the system will not request any password.

In a monorepo setup where frontend and backend are ran in the same environment, only the API_PORT needs to be changed.

# How to setup
## Frontend

1. **CD to frontend**
```bash
cd ./frontend
```

2. **Install NPM packages**
```bash
npm install
```

3. **Build files**
```bash
npm run build
```

4. **Copy files**

Copy the static files from the /dist folder to /var/www/your-folder (or where ever they need to be in your setup)

5. **Remember to reference the correct folder in your webserver setup**

## Backend

### Backend Docker Deployment (Recommended)

You can easily run and manage the backend using Docker Compose. All configuration (ports, volumes, and environment variables) is handled automatically.

From the root directory, simply run:

```bash
docker compose up -d --build
```

This command will:
- Build the backend image.
- Read your `.env` file and map the ports based on the value of `API_PORT`.
- Mount the SQLite database directory (located under `./data` on the host, containing `movies.db`) for persistence.


### Manual Backend Deployment

1. **CD to backend**
```bash
cd ./backend
```
2. **Install NPM packages**
```bash
npm install
```

3. **Build files**
```bash
npm run build
```

4. **Run with PM2**
```bash
pm2 start dist/main.js --name movies-api
```

5. **Test it out**

If the backend is not connecting correctly you can check the status of containers and logs with:
```bash
pm2 list
pm2 logs
```

