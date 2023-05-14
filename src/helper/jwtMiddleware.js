const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secret = process.env.JWT_SECRET_KEY;

exports.sign = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '4h' });
};

exports.jwtMiddleware = () => {
    return expressJwt({ secret, algorithms: ['HS256'] });
};

exports.isAuthenticated = async (req, res, next) => {
    if (req.user) {
        const user = await User.findByIdPromise(req.user.id)
        if (!user) return res.status(401).send({ status: false, message: 'Unauthorized' });
        req.user.userInDb = user
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
