const secretKey = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed. Token invalid or expired.' });
      }
  
      req.user = decoded;
      next();
    });
  };
  
  module.exports = jwtMiddleware;
  