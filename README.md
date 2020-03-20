# node-tasks
Lab Node.js course

## 01:
JSON logger web-server that handles all requests, can respond with a default body, a log JSON file and logs for specified Date range.

To request a **full log file**, the request should be of method **GET** and look like the following:
```
localhost:8081/logs
```

To request logs for **specific Date range**, the request should be of method **GET** and look like the following:
```
localhost:8081/logs?start=<start-date>&end=<end-date>
```
where `<stard-date>` and `<end-date>` are in `Date.getTime()` format (integer values)

## 02:
Express web-server that implements a scalable Router and uses JWT for authorization.
User should be able to:
* Log in to the system
* View only personal notes
* Add/delete notes
* See total number of their notes
* Manage notes when logged in
* Check/uncheck any note

Additionally, you should be able to:
* Register users
* Edit personal notes
* Let user delete their account
* Generate docs using apidoc npm package
* Have a simple UI for the application

To **run the app**, use `npm run dev` when in 02-hw folder
(*note that server is pre-configured to run concurrently with the client on port 8081*).