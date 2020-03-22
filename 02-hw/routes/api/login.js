const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { secret } = require('../../config/auth.json');
const mockUsers = require('../../data/users.json');
const mockNotes = require('../../data/notes.json');

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
/* Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5vdGVzIjpbeyJ0aXRsZSI6Im5vdGUxMSIsImNvbnRlbnQiOiJUaGlzIGlzIHNvbWUgbm90ZSAxMSJ9LHsidGl0bGUiOiJub3RlMTIiLCJjb250ZW50IjoiVGhpcyBpcyBzb21lIG5vdGUgMTIifV0sImlhdCI6MTU4NDg4MjM2MH0.6Zj42eGIyBOc4kibM55ERugXs8Z35HM7WddbFEwNicw
*/
