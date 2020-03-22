const fs = require('fs');
const { prettyStringify } = require('../utils/helpers');

const updateFile = (filePath, updatedData) => {
  fs.writeFileSync(filePath, prettyStringify(updatedData));
};

module.exports = { updateFile };
