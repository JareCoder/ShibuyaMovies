# ShibuyaMovies
A simple React Vite app to help us vote for movie night suggestions. Self hosted in Oracle could through Nginx.

Main view:

![image](https://github.com/user-attachments/assets/20db941f-c021-4e0e-b39c-ff1f996616d3)


Add Movie:

![image](https://github.com/user-attachments/assets/7c51302f-b3e1-40ea-95f6-9047ae82eeed)


# How to setup
Copy the .env-example file and rename it to .env. Fill in values:
- API_PORT: The port the API will be opened to.
- API_ROOT: Don't touch if you don't know what you are doing.
- API_URL: The URL where the API is hosted in.
- VITE_API_URL: Frontend connects to this. No need to touch.
- VITE_POSTER_URL: A backup poster image URL that is used, if no URL is provided when adding a movie.

In a monorepo setup where frontend and backend are ran in the same environment, only the API_PORT needs to be changed.
