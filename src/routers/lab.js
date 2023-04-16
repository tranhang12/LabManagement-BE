const express = require('express');
const router = express.Router();
const labController = require('../controllers/lab');
router.post('/lab', labController.addLab);

router.get('/lab', labController.getAllLabs);
router.get('/lab/:Id', labController.getLab);
router.put('/lab/:Id', labController.updateLab);
router.delete('/lab/:Id', labController.deleteLab);
module.exports = router;
