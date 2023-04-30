const express = require('express');
const router = express.Router();
const trashController = require('../controllers/trash');


router.get('/trash', trashController.getAlltrashs);
//router.get('/trash/:Id', trashController.gettrash);
router.post('/trash', trashController.addtrash);
router.put('/trash/:Id', trashController.updatetrash);


module.exports = router;