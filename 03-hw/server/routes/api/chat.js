const express = require('express');
const router = express.Router();

const { Message } = require('../../models');

// Get All Trucks
router.get('/chat', async (req, res) => {
  // const message = await Message.find();
  // res.json({ status: 'Found message', message });

  const result = await Message.find();
  res.json(result);
});

module.exports = router;
