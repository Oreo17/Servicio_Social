const express = require("express");
const {
  getCourse,
  getCourses,
  createCourse,
  addStudentCourse,
} = require("../controllers/courses");
const authMiddleware = require("../middleware/session");
const router = express.Router();

// http://localhost/users GET,POST,DELETE, PUT

// Protegemos nuestras rutas
//router.get("/",authMiddleware, getCourses);

router.get("/", getCourses);

router.get("/:nrc", getCourse);

router.post("/", createCourse);

router.post("/add/", addStudentCourse);

module.exports = router;
