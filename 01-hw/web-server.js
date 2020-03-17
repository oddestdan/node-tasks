const http = require('http');
const logger = require('./logger');

const onRequest = (request, response) => {
  logger.logData(request); // TODO: pass request here for info
  response.writeHead(200);
  response.end();
};

http.createServer(onRequest).listen(8081);
console.log('Web Server running on port 8081...');
