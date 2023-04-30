const express = require('express');
const router = express.Router();
const harvestStorageController = require('../controllers/harvestStorage');


router.get('/harvestStorage', harvestStorageController.getAllHarvestStorages);
//router.get('/harvestStorage/:Id', harvestStorageController.getharvestStorage);
router.post('/harvestStorage', harvestStorageController.addharvestStorage);
router.put('/harvestStorage/:Id', harvestStorageController.updateharvestStorage);


module.exports = router;