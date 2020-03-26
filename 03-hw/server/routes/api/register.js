const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const router = express.Router();
// const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.post('/register', (req, res) => {
  const userData = ({ username, password, role } = req.body);

  // // asynchronous
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(password, salt, (err, hash) => {
  //     password = hash;
  //   });
  // });

  const user = new User(userData);

  user
    .save()
    .then(() => {
      console.log('Then in register');
      res.json({ status: 'New user created', user });
    })
    .catch(e => {
      console.log('Catch in register');
      res.status(500).json({ status: e.message });
    });

  // TODO: Sign up and Sign in at the same time ?
  // const jwtToken = jwt.sign(user, secret);
  // res.json({ jwtToken });
});

module.exports = router;
