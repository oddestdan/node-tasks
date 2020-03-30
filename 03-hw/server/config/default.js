const path = require('path');

const config = {
  server: {
    port: 8081
  },
  log: {
    path: path.join(__dirname, '../logs/logs.json')
  },
  db: {
    username: 'foo',
    password: 'bar',
    cluster: 'server.example.net',
    dbname: 'db_example'
  },
  jwt: {
    secret: 'this_is_a_secret'
  },
  password: {
    saltFactor: 10
  }
};

module.exports = config;
