const express = require('express');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const router = express.Router();

const { User } = require('../../models');

router.post('/register', (req, res) => {
  const userData = ({ username, password, role } = req.body);
  const user = new User(userData);

  const validation = user.joiValidate(userData);
  if (validation.error) {
    return res.status(422).json({ status: validation.error.message });
  }

  user
    .save()
    .then(() => {
      res.json({
        status: 'New user created',
        user
      });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });

  // TODO: Sign up and Sign in at the same time ?
  // const jwtToken = jwt.sign(user, secret);
  // res.json({ jwtToken });
});

module.exports = router;
