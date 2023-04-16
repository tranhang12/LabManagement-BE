const express = require('express');
const router = express.Router();
const greenHouseController = require('../controllers/greenHouse');
router.post('/greenHouse', greenHouseController.addGreenHouse);
router.get('/greenHouse', greenHouseController.getAllGreenHouses);
router.get('/greenHouse/:Id', greenHouseController.getGreenHouse);
router.put('/greenHouse/:Id', greenHouseController.updateGreenHouse);
router.delete('/greenHouse/:Id', greenHouseController.deleteGreenHouse);
module.exports = router;
