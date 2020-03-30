const express = require('express');
const router = express.Router();

const { User } = require('../../models');

const jwt = require('jsonwebtoken');
const { secret } = require('config').get('jwt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: `Username ${username} was not found`
      });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({
        status: `Password for username ${username} is incorrect`
      });
    }

    const jwtoken = jwt.sign({ username, password }, secret, {
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

module.exports = router;
