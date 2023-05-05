const express = require('express');
const router = express.Router();

const { moveCrop } = require('../controllers/culturePlanController');

router.post('/moveCrop', moveCrop);

module.exports = router;
