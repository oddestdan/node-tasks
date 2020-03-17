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

      parsedData.logs.push({
        method: 'POST',
        url: '/some/mock/url',
        time: Math.random() * 100000
      });

      const updatedData = JSON.stringify(parsedData, null, 2);

      updateFile(updatedData);
    } else {
      console.log(err);
    }
  };

  fs.readFile(logFile, 'utf8', onReadFile.bind(null, request));
};

module.exports = { logData };
