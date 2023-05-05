const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.get('/allTask', taskController.getAllTasks);
router.get('/task/:Id', taskController.getTask);
router.post('/task', taskController.addTask);
router.put('/task/:Id', taskController.updateTask);
router.delete('/task/:Id', taskController.deleteTask);

module.exports = router;
