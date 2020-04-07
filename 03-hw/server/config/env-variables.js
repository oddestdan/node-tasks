const config = {
  server: {
    port: 'SERVER_PORT',
  },
  log: {
    path: 'LOG_PATH',
  },
  db: {
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    cluster: 'DB_CLUSTER',
    dbname: 'DB_DBNAME',
  },
  jwt: {
    secret: 'JWT_SECRET',
  },
  password: {
    saltFactor: 'PASSWORD_SALT_FACTOR',
  },
  weather: {
    baseUrl: {
      protocol: 'WEATHER_BASE_URL_PROTOCOL',
      hostname: 'WEATHER_BASE_URL_HOST_NAME',
      path: 'WEATHER_BASE_URL_PATH',
    },
    query: {
      name: 'WEATHER_QUERY_NAME',
      id: 'WEATHER_QUERY_ID',
      coordinates: {
        latitude: 'WEATHER_QUERY_COORDINATES_LATITUDE',
        longitude: 'WEATHER_QUERY_COORDINATES_LONGITUDE',
      },
      zipcode: 'WEATHER_QUERY_ZIPCODE',
    },
    APIkey: 'WEATHER_API_KEY',
  },
  fileUpload: {
    cloud_name: 'FILE_UPLOAD_CLOUD_NAME',
    api_key: 'FILE_UPLOAD_API_KEY',
    api_secret: 'FILE_UPLOAD_API_SECRET',
  },
};

module.exports = config;
