const fs = require('fs');

const logFile = 'logs.json';

const updateFile = newData => {
  fs.writeFile(logFile, newData, 'utf8', err => {
    if (!err) {
      console.log(`Log file ${logFile} successully updated`);
    } else {
      console.log(err);
    }
  });
};

const logData = request => {
  const onReadFile = (err, fileData) => {
    if (!err) {
      const parsedData = JSON.parse(fileData);
      const { method, url } = request;
      const time = new Date().getTime();

      parsedData.logs.push({ method, url, time });
      const updatedData = JSON.stringify(parsedData, null, 2);

      updateFile(updatedData);
    } else {
      console.log(err);
    }
  };

  fs.readFile(logFile, 'utf8', onReadFile);
};

module.exports = { logData };
