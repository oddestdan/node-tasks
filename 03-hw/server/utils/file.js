const fs = require('fs');

const prettyStringify = (data) => JSON.stringify(data, null, 2);

const readFile = (filePath, defaultBody) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, prettyStringify(defaultBody));
  }
  return fs.readFileSync(filePath, 'utf8');
};

const updateFile = (filePath, updatedData) => {
  fs.writeFileSync(filePath, prettyStringify(updatedData));
};

module.exports = { readFile, updateFile };
