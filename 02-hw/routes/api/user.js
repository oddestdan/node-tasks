const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
  console.log(req);
  res.json(req.user);
});

module.exports = router;
