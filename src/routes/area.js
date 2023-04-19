const express = require('express');
const router = express.Router();
const areaController = require('../controllers/area');

router.get('/area', areaController.getAllAreas);
router.get('/area/Id', areaController.getArea);
router.get('/area/name', areaController.getAreaByName);
router.post('/area', areaController.addArea);
router.put('/area/:Id', areaController.updateArea);

router.delete('/area/:Id', areaController.deleteArea);
 module.exports = router;