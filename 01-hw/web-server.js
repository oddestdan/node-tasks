const http = require('http');
const logger = require('./logger');

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(logger.handleData(request));
};

http.createServer(onRequest).listen(8081);
console.log('Web Server running on port 8081...');
