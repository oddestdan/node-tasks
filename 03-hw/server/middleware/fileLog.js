const { updateFile, readFile } = require('../utils');
const { path } = require('config').get('log');

module.exports = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().toISOString();

  const fileData = JSON.parse(readFile(path, { logs: [] }));

  fileData.logs.push({ method, url, time });
  updateFile(path, fileData);

  next();
};
