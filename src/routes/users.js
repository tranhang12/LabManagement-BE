const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/update', userController.updateUserInfo);

router.post('/reset', userController.resetPassword);

router.delete('/delete', userController.deleteUser);

module.exports = router;
