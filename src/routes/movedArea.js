const express = require('express');
const router = express.Router();
const movedAreaController = require('../controllers/movedArea');


router.get('/movedArea', movedAreaController.getAllmovedAreas);
//router.get('/movedArea/:Id', movedAreaController.getmovedArea);
router.post('/movedArea', movedAreaController.addmovedArea);
router.put('/movedArea/:Id', movedAreaController.updatemovedArea);


module.exports = router;