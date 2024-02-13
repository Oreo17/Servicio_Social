const express = require("express");
const {
  getQualifications,
  addQualification,
  updateCalificacion,
} = require("../controllers/grades");
const router = express.Router();

// http://localhost/users GET,POST,DELETE, PUT

router.get("/", getQualifications);

router.get("/:id", getQualifications);

router.post("/", /*addQualification*/ updateCalificacion);

module.exports = router;
