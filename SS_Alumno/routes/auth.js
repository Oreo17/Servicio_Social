const express = require("express");
const { loginCtrl, registerCtrl, createToken } = require("../controllers/auth");
const { validatorLogin, validatorRegister } = require("../validators/auth");
const router = express.Router();
// http://localhost/auth GET,POST,DELETE, PUT

router.post("/login", validatorLogin, loginCtrl);
router.post("/register", validatorRegister, registerCtrl);
router.post("/pass", createToken);

module.exports = router;
