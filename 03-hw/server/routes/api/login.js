const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const { secret } = require('config').get('jwt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        // Found username in database
        user.validatePassword(password).then(matches => {
          if (matches) {
            // Entered password matches username
            const jwtoken = jwt.sign({ username, password }, secret, {
              expiresIn: 604800 // 1 week
            });
            res.json({
              status: 'User logged in',
              token: `JWT ${jwtoken}`,
              user
            });
          } else {
            res.status(401).json({
              status: `Password for username ${username} is incorrect`
            });
          }
        });
      } else {
        res.status(401).json({ status: `Username ${username} was not found` });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
