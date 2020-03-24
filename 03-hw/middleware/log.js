const { updateFile, readFile } = require('../utils');
const { LOG_PATH } = require('../globals/paths');

module.exports = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().getTime();

  console.log(`Request: ${method} ${url}`);

  const data = JSON.parse(readFile(LOG_PATH, { logs: [] }));
  data.logs.push({ method, url, time });
  updateFile(LOG_PATH, data);

  next();
};
