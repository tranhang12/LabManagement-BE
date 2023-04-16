const express = require('express');
const router = express.Router();
const growthParametersController = require('../controllers/growthParameters');
router.post('/growthParameters', growthParametersController.addGrowthParameter);
router.get('/growthParameters', growthParametersController.getAllGrowthParameters);
router.get('/growthParameters/:Id', growthParametersController.getGrowthParameter);
router.put('/growthParameters/:Id', growthParametersController.updateGrowthParameter);
router.delete('/growthParameters/:Id', growthParametersController.deleteGrowthParameter);
module.exports = router;