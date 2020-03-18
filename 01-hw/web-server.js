const http = require('http');
const logger = require('./logger');

const responseJSON = { status: 'ok' };

const onRequest = (request, response) => {
  logger.logData(request);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(responseJSON));
};

http.createServer(onRequest).listen(8081);
console.log('Web Server running on port 8081...');
