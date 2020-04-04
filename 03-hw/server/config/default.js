const path = require('path');

const config = {
  server: {
    port: 8081,
  },
  log: {
    path: path.join(__dirname, '../logs/logs.json'),
  },
  db: {
    username: 'foo',
    password: 'bar',
    cluster: 'server-example.mongodb.net',
    dbname: 'db_example',
  },
  jwt: {
    secret: 'this_is_a_secret',
  },
  password: {
    saltFactor: 10,
  },
  weather: {
    baseUrl: {
      protocol: 'http',
      hostname: 'api.openweathermap.org',
      path: '/data/2.5/weather',
    },
    query: {
      name: 'q',
      id: 'id',
      coordinates: {
        latitude: 'lat',
        longitude: 'lon',
      },
      zipcode: 'zip',
    },
    APIkey: '<OPEN_WEATHER_MAP_API_KEY>',
  },
};

module.exports = config;
