const { updateFile, readFile } = require('../utils');
const { path } = require('config').get('log');

module.exports = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().getTime();

  console.log(`Request: ${method} ${url}`);

  const data = JSON.parse(readFile(path, { logs: [] }));
  data.logs.push({ method, url, time });
  updateFile(path, data);

  next();
};
