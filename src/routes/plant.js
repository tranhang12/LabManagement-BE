const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant');

router.get('/plant', plantController.getAllPlants);
router.get('/plant/:Id', plantController.getPlant);
router.post('/plant', plantController.addPlant);
router.put('/plant/:Id', plantController.updatePlant);
router.delete('/plant/:Id', plantController.deletePlant);

module.exports = router;
