const express = require("express");
const router = express.Router();
const { getInfoUser } = require("../controllers/users");
const { validatorCreateUser } = require("../validators/users");
const customHeaders = require("../middleware/customHeader");

// http://localhost/users GET,POST,DELETE, PUT
//router.get("/", getUsers);

router.get("/info/:id", getInfoUser);

module.exports = router;
