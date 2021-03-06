# node-tasks

## Final, 3rd task

Uber-like web application for freight trucks using REST, Vue.js and MongoDB.

### API Documentation

Uber Node API is documented via [Postman Documentation publisher](https://learning.postman.com/docs/postman-for-publishers/public-api-docs/).

[API Documentation reference for Uber Node collection](https://documenter.getpostman.com/view/9968627/SzYdRaww)

## Prerequisites

1. Installed Node.js, access to MongoDB database.
2. (Windows) Set bash shell (or similar shell) instead of standard cmd.exe by running:

```
cd server
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

_Note_: if git bash has a custom installation path, please use it for the config command above.

## Project setup

### Client (UI side)

```
cd client
npm i
npm run serve
```

### Server (BE side)

```
cd server
npm i
npm run start

// or run node service with pretty pino request logging

npm run dev

// or run nodemon with pretty pino

npm run watch
```

### Database (MongoDB)

Project uses [MongoDB Atlas cloud service](https://www.mongodb.com/cloud/atlas). In order to connect to the database, it is required to provide username, password, cluster and database titles to project's config.

If you prefer to use **local MongoDB**, please proceed to **override** the `dbURI string` with your own connection string (located in `/server/index.js`).

### Weather (OpenWeatherMap)

Project uses a free-to-use [OpenWeather API](https://openweathermap.org/api). In order to successfully fetch to the API, it is required to provide your own **OpenWeatherAPI key** (located on the site, in `Profile -> API keys`) to the project's config.

_Note_: upon the initial sign up to the OpenWeather API, it might take **several hours** for the key to activate.

### Avatar Upload (Cloudinary)

Project uses a free-to-use subscription for [Cloudinary API](https://cloudinary.com/). In order to successfully fetch to the API, it is required to provide your own **Cloud name**, **API key** and **API secret** (located on the site, in `Dashboard -> Account details`) to the project's config.

## Project development

[Scrum Board](https://trello.com/b/5WFzOL8H/uber)

## Git Flow

Branch management using [Atlassian Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
