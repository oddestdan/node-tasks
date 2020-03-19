const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { secret } = require('../../config/auth.json');

const mockUsers = [
  { id: 1, username: 'Dan', password: 'qwer' },
  { id: 2, username: 'Ten', password: 'asdf' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = mockUsers.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    res.status(401).json({ status: 'User not found' });
  }

  const jwt_token = jwt.sign(user, secret);

  res.json({ jwt_token });
});

module.exports = router;
