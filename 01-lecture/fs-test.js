const fs = require('fs');

const fileContent = fs.readFileSync('./test.txt', { encoding: 'utf-8' }); // or just 'utf-8'
const parsed = fileContent.replace(/\d/gi, '_');

fs.writeFileSync('./test.parsed.txt', parsed, 'utf-8');