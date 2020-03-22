const express = require('express');
const path = require('path');
const router = express.Router();

// Handles any requests that don't match the handled ones
router.get('*', (req, res) => {
  console.log('Rest handler doing its work');
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = router;
