const express = require("express");
const { getPlanes, getPlan } = require("../controllers/syllabus");
const router = express.Router();

// http://localhost/users GET,POST,DELETE, PUT

router.get("/:id", getPlan);

router.get("/", getPlanes);

module.exports = router;
