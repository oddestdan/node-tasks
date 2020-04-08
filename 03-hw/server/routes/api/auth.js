const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('config').get('jwt');

const { User } = require('../../models');

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: `Username ${username} was not found`
      });
    }

    const validation = User.joiValidate({ username, password });
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({
        status: `Password for username ${username} is incorrect`
      });
    }

    const jwtoken = jwt.sign({ userId: user._id }, secret, {
      expiresIn: 604800 // 1 week
    });
    return res.json({
      status: 'User logged in',
      token: `JWT ${jwtoken}`,
      user
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

router.post('/auth/register', (req, res) => {
  const { username, password, role } = req.body;
  const userData = { username, password, role: role.toLowerCase() };

  const validation = User.joiValidate(userData);
  if (validation.error) {
    return res.status(422).json({ status: validation.error.message });
  }

  const user = new User(userData);

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
