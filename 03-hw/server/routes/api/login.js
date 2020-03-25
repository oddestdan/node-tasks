const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const { secret } = require('config').get('jwt');

router.post('/login', (req, res) => {
  const userData = ({ username, password } = req.body);

  User.findOne(userData)
    .then(user => {
      if (user) {
        const jwtoken = jwt.sign(userData, secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({ status: 'User logged in', token: `JWT ${jwtoken}`, user });
      } else {
        res.status(401).json({ status: 'User not found' });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
