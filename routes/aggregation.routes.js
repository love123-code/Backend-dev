const express = require("express");
const router = express.Router();
const controller = require("../controllers/aggregation.controller");

router.get("/avg-gpa-dept", controller.avgGpaByDept);
router.get("/popular-courses", controller.popularCourses);
router.get("/performance", controller.performance);

module.exports = router;