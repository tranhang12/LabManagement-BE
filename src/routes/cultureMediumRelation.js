const express = require('express');
const router = express.Router();
const cultureMediumRelationController = require('../controllers/cultureMediumRelation');

router.get('/cultureMediumRelation', cultureMediumRelationController.getAllRelations);
router.post('/cultureMediumRelation', cultureMediumRelationController.addRelation);
router.delete('/cultureMediumRelation/:cultureId/:cultureMediumId', cultureMediumRelationController.deleteRelation);

module.exports = router;
