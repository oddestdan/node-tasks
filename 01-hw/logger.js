const fs = require('fs');
const { parseUrlParams, prettyStringify } = require('./utils');

const logFilePath = 'logs.json';
const defaultResponse = { status: 'ok' };
const defaultLogBody = { logs: [] };

const readFile = () => {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, prettyStringify(defaultLogBody));
  }
  return fs.readFileSync(logFilePath, 'utf8');
};

const updateFile = newData => {
  fs.writeFileSync(logFilePath, newData);
};

const logRequest = (parsedData, requestInfo) => {
  parsedData.logs.push(requestInfo);
  updateFile(prettyStringify(parsedData));
};

const handleParamRequest = (fileData, responseBody, { start, end }) => {
  if (start && end) {
    responseBody.response = fileData.logs.filter(
      log => start <= log.time && log.time <= end
    );
  } else {
    throw new Error(`'start' or 'end' parameters are not provided!`);
  }
};

const handleData = request => {
  const { method, url } = request;
  const time = new Date().getTime();
  let responseBody = { ...defaultResponse };

  const parsedData = JSON.parse(readFile());
  logRequest(parsedData, { method, url, time });

  if (request.method === 'GET' && url.startsWith('/logs')) {
    const params = parseUrlParams(url);

    responseBody.response = parsedData.logs;
    if (params) handleParamRequest(parsedData, responseBody, params);
  }

  return JSON.stringify(responseBody);
};

module.exports = { handleData };
