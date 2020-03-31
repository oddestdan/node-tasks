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
  },
  password: {
    saltFactor: 'PASSWORD_SALT_FACTOR'
  }
};

module.exports = config;
