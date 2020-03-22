const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth.json');

module.exports = (req, res, next) => {
  // authorization header format: 'JWT <some-token>'
  const [type, token] = req.headers['authorization'].split(' ');
  req.user = jwt.verify(token, secret);

  next();
};
