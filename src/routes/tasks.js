const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const { jwtMiddleware, isAdmin, isAuthenticated } = require('../helper/jwtMiddleware');

router.get('/allTask', taskController.getAllTasks);
router.get('/task/:Id', taskController.getTask);
router.post('/task', jwtMiddleware(), isAuthenticated, isAdmin, taskController.addTask);
router.put('/task/:Id', taskController.updateTask);
router.delete('/task/:Id', taskController.deleteTask);

module.exports = router;
