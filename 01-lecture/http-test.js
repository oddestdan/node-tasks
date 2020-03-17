const http = require('http');

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end('web server works!');
  })
  .listen(8081);
