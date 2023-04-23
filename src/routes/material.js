const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material');

router.post('/material', materialController.addMaterial);
router.get('/material', materialController.getAllMaterials);
router.get('/material/:Id', materialController.getMaterial);
router.put('/material/:Id', materialController.updateMaterial);
router.delete('/material/:Id', materialController.deleteMaterial);

module.exports = router;
