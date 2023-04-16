const express = require('express');
const router = express.Router();
const growthRecordController = require('../controllers/growthRecord');

router.get('/growthRecord', growthRecordController.getAllGrowthRecords);
router.get('/growthRecord/:Id', growthRecordController.getGrowthRecord);
router.post('/growthRecord', growthRecordController.addGrowthRecord);
router.put('/growthRecord/:Id', growthRecordController.updateGrowthRecord);
router.delete('/growthRecord/:Id', growthRecordController.deleteGrowthRecord);

module.exports = router;
