# node-tasks

## Final, 3rd task

Uber-like web application for freight trucks using REST, Vue.js and MongoDB.

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
```

Alternatives to the last command:
`npm run watch` for **nodemon service**
`npm run dev` for "pretty" pino **request logging**, or run the following command directly: `LOG_LEVEL=debug node index.js | ./node_modules/.bin/pino-pretty`

## Project development

[Scrum Board](https://trello.com/b/5WFzOL8H/uber)

## Git Flow

Branch management using [Atlassian Git Flow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
