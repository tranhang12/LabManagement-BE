const express = require('express');
const router = express.Router();
const cultureController = require('../controllers/culture');


router.get('/culture', cultureController.getAllCultures);
router.get('/culture/:Id', cultureController.getCulture);
router.post('/culture', cultureController.addCulture);
router.put('/culture/:Id', cultureController.updateCulture);
router.delete('/culture/:Id', cultureController.deleteCulture);

module.exports = router;
