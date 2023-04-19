const express = require('express');
const router = express.Router();
const culturePlanController = require('../controllers/culturePlan');

router.get('/culturePlan', culturePlanController.getAllCulturePlans);
router.get('/culturePlan/:Id', culturePlanController.getCulturePlan);
router.post('/culturePlan', culturePlanController.addCulturePlan);
router.put('/culturePlan/:Id', culturePlanController.updateCulturePlan);
router.delete('/culturePlan/:Id', culturePlanController.deleteCulturePlan);

router.post('/culturePlan/:Id/movement', culturePlanController.createOrUpdateMovement);
router.put('/culturePlan/:Id/movement', culturePlanController.createOrUpdateMovement);
router.delete('/culturePlan/:Id/movement', culturePlanController.deleteMovement);

module.exports = router;