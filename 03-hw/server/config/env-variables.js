const config = {
  server: {
    port: 'SERVER_PORT'
  },
  log: {
    path: 'LOG_PATH'
  },
  db: {
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    cluster: 'DB_CLUSTER',
    dbname: 'DB_DBNAME'
  },
  jwt: {
    secret: 'JWT_SECRET'
  }
};

module.exports = config;
