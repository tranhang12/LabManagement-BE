const express = require('express');
const router = express.Router();
const nurseryController = require('../controllers/nursery');

router.get('/nursery', nurseryController.getAllNurseries);
router.get('/nursery/:Id', nurseryController.getNursery);
router.post('/nursery', nurseryController.addNursery);
router.put('/nursery/:Id', nurseryController.updateNursery);
router.delete('/nursery/:Id', nurseryController.deleteNursery);

module.exports = router;
