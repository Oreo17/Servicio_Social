const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
  check("nombre").notEmpty().exists(),
  check("apellidoMaterno").notEmpty().exists(),
  check("apellidoPaterno").notEmpty().exists(),
  check("correo").notEmpty().exists(),
  check("telefono").notEmpty().exists(),
  check("tipo").notEmpty().exists(),
  check("idPlanEstudio").notEmpty().exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("matricula").notEmpty().exists(),
  check("password").notEmpty().exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
