const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUsers,
  getInfoUser,
  createAccount,
  getInfoUsuarios,
  getInfoUsuariosQuery,
  updateSemester,
  getInfoUsuariosTutor,
  getInfoUsuariosQueryTutor,
  getTutores,
} = require("../controllers/users");
const { validatorCreateUser } = require("../validators/users");
const customHeaders = require("../middleware/customHeader");

// http://localhost/users GET,POST,DELETE, PUT
//router.get("/", getUsers);
router.get("/", getInfoUsuarios);

router.get("/query/:query", getInfoUsuariosQuery);

router.get("/:id", getUser);

router.get("/info/:id", getInfoUser);

router.post("/register", createAccount);

router.post("/registerUser", createUsers);

router.get("/update/:id", updateSemester);

router.get("/tutores/", getTutores);

router.get("/tutorados/:id", getInfoUsuariosTutor);

router.get("/tutorados/query/:id/:query", getInfoUsuariosQueryTutor);

module.exports = router;
