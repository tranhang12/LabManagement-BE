const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const jwtMiddleware = require('../helper/jwtMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/createUser', jwtMiddleware.jwtMiddleware(), jwtMiddleware.isAdmin, userController.createUser);
router.get('/getAllUsers', jwtMiddleware.jwtMiddleware(), jwtMiddleware.isAdmin, userController.getAllUsers);
router.get('/getUser/:id', jwtMiddleware.jwtMiddleware(), jwtMiddleware.isAuthenticated, userController.getUser);
router.put('/updateUserInfo/:id', jwtMiddleware.jwtMiddleware(), jwtMiddleware.isAdmin, userController.updateUserInfo);
router.delete('/deleteUser/:id', jwtMiddleware.jwtMiddleware(), jwtMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
