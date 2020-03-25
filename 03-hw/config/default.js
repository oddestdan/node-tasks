const path = require('path');

const config = {
  server: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 8081
  },
  log: {
    path: path.join(__dirname, '../logs/logs.json')
  },
  db: {
    username: 'oddestdan',
    password: 'ZXnJ5xCk',
    cluster: 'uber-node-pypi1.mongodb.net',
    dbname: 'Uber_Node'
  },
  jwt: {
    secret: 'some_secret_message'
  }
};

module.exports = config;
