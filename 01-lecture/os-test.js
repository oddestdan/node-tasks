const { platform, arch, release, totalmem, freemem } = require('os');

console.log(`Your OS: ${release()} ${platform()} ${arch()}`);

console.log(`${((freemem() / totalmem()) * 100).toFixed(2)} % of your RAM is free`);