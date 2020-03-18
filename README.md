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