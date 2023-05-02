const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

exports.sign = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

exports.jwtMiddleware = () => {
    return expressJwt({ secret, algorithms: ['HS256'] });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send({ status: false, message: 'Unauthorized' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ status: false, message: 'Unauthorized' });
    }
};
