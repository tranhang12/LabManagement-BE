const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/field');

router.get('/field', fieldController.getAllFields);
router.get('/field/:Id', fieldController.getField);
router.post('/field', fieldController.addField);
router.put('/field/:Id', fieldController.updateField);
router.delete('/field/:Id', fieldController.deleteField);
module.exports = router;
