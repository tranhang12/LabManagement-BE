const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const createToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '4h' });

  return token;
}

module.exports = createToken;
