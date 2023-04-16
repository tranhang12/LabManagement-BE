const express = require('express');
const router = express.Router();
const cultureMediumController = require('../controllers/cultureMedium');


router.get('/cultureMedium', cultureMediumController.getAllCultureMediums);
router.get('/cultureMedium/:Id', cultureMediumController.getCultureMedium);
router.post('/cultureMedium', cultureMediumController.addCultureMedium);
router.put('/cultureMedium/:Id', cultureMediumController.updateCultureMedium);
router.delete('/cultureMedium/:Id', cultureMediumController.deleteCultureMedium);
module.exports = router;
