const express = require('express');
const router = express.Router();
const userCulturePlanController = require('../controllers/userCulturePlan');


router.get('/userCulturePlan', userCulturePlanController.getAlluserCulturePlans);
//router.get('/userCulturePlan/:Id', userCulturePlanController.getuserCulturePlan);
router.post('/userCulturePlan', userCulturePlanController.adduserCulturePlan);
//router.put('/userCulturePlan/:Id', userCulturePlanController.updateuserCulturePlan);


module.exports = router;