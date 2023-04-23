const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.Username
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

module.exports = createToken;
