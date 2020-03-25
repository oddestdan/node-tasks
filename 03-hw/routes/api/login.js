const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const { secret } = require('config').get('jwt');

router.post('/login', (req, res) => {
  const userData = ({ username, password } = req.body);

  User.find(userData)
    .then(user => {
      const jwtoken = jwt.sign(userData, secret, {
        expiresIn: 604800 // 1 week
      });
      res.json({ status: 'ok', token: `JWT ${jwtoken}`, user });
    })
    .catch(e => {
      res.status(500).json({ status: e.message }); // 'User not found'
    });
});

module.exports = router;
