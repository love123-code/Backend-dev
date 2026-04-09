const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.post("/", controller.createStudent);
router.get("/", controller.getAllStudents);
router.get("/email/:email", controller.getStudentByEmail);
router.put("/gpa/:email", controller.updateGPA);
router.delete("/:email", controller.deleteStudent);

router.get("/gpa-range", controller.gpaRange);
router.get("/more-courses", controller.moreCourses);
router.get("/top", controller.topStudents);
router.get("/count-by-city", controller.countByCity);

module.exports = router;