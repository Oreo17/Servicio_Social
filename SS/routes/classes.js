const express = require("express");
const router = express.Router();
const {
  getCurrent2,
  getNext2V,
  getClasses,
  percentage,
  obtenerMateriasDisponibles,
  getNext,
  failed,
} = require("../controllers/classes");

// http://localhost/users GET,POST,DELETE, PUT
router.get("/next/:id", getNext);

router.get("/current/:id", getCurrent2);

router.get("/:id", getClasses);

router.post("/");

router.get("/available/:id", obtenerMateriasDisponibles);

router.get("/failed/:id", failed);

module.exports = router;
