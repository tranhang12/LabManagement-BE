const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");

router.get("/areas-with-culture-plan", areaController.getAreasWithCulturePlan);
router.get("/all-areas", areaController.getAllAreas);

module.exports = router;
