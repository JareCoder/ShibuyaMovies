﻿# ShibuyaMovies
A simple React Vite app with a Node backend to help us vote for movie night suggestions. Self hosted in Oracle cloud through Nginx.

Users ids are generated into cookies. Why? I don't want to hassle with a proper account / user management, but still wanted to monitor who can delete what posts and how likes and dislikes are calculated. Random generated ID in cookies is good enough for that!

Main view:

![image](https://github.com/user-attachments/assets/20db941f-c021-4e0e-b39c-ff1f996616d3)


Add Movie:

![image](https://github.com/user-attachments/assets/7c51302f-b3e1-40ea-95f6-9047ae82eeed)


# How to configure
Copy the .env-example file and rename it to .env. Fill in values:

- API_PORT: The port the API will be opened to.
- API_ROOT: Don't touch if you don't know what you are doing.
- API_URL: The URL where the API is hosted in.
- VITE_API_URL: Frontend connects to this. No need to touch.
- VITE_POSTER_URL: A backup poster image URL that is used, if no URL is provided when adding a movie.

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