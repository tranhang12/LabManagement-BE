const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material');

router.post('/addMaterial', materialController.addMaterial);
router.get('/getAllMaterial', materialController.getAllMaterials);
router.get('/getMaterial/:Id', materialController.getMaterial);
router.put('/updateMaterial/:Id', materialController.updateMaterial);
router.delete('/deleteMaterial/:Id', materialController.deleteMaterial);

module.exports = router;
