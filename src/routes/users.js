const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/create', jwtMiddleware, checkAdmin, userController.createUser);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.post('/update', jwtMiddleware, userController.updateUserInfo);
router.post('/reset', jwtMiddleware, userController.resetPassword);
router.delete('/delete', jwtMiddleware, checkAdmin, userController.deleteUser);

module.exports = router;