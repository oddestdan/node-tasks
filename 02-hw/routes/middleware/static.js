const express = require('express');
const path = require('path');

// Serve the static files from the React app
module.exports = (req, res, next) => {
  express.static(path.join(__dirname, 'client/build'));
  next();
};
