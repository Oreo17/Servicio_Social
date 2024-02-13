const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { Calificacion } = require("../models/sql/calificacion");
const { where } = require("sequelize");

// Calificaciones
/**
 * Get users
 * @param {*} req
 * @param {*} res
 */
const getQualification = async (req, res) => {
  try {
    const nrc = req.params.nrc;
    const data = await Calificacion.findOne({ where: { id: id } });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Get qualifications
 * @param {*} req
 * @param {*} res
 */
const getQualifications = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Calificacion.findAll({ where: { id: id } });
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_QUALIFICTION");
  }
};

/**
 * Add a new user
 * @param {*} req
 * @param {*} res
 */
const addQualification = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const data = await Calificacion.create(body);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_USER");
  }
};

const updateCalificacion = async (req, res) => {
  try {
    console.log(req.body);
    const { idCurso, idCuenta } = req.body;

    const criteria = {
      idCurso: idCurso,
      idCuenta: idCuenta,
    };
    console.log(criteria);
    const getExistingGrade = await Calificacion.findOne({
      where: criteria,
    });
    console.log(getExistingGrade);
    if (!getExistingGrade) {
      handleHttpError(res, "ERROR_UPDATE_GRADE");
      return;
    }

    let intentos = getExistingGrade.intentos;
    console.log("---------------------- " + intentos);
    const grade = req.body.calificacion;
    if (grade < 6) {
      intentos += 1;
    }

    const newValues = {
      calificacion: req.body.calificacion,
      cursada: req.body.cursada,
      intentos: intentos,
    };
    console.log("---------------------- " + intentos);
    const [numRowsUpdated] = await Calificacion.update(newValues, {
      where: criteria,
    });

    if (numRowsUpdated === 1) {
      res.send({ message: "SUCCESS" });
    } else {
      handleHttpError(res, "ERROR_UPDATE_GRADE");
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_UPDATE_GRADE");
  }
};

module.exports = {
  getQualification,
  getQualifications,
  addQualification,
  updateCalificacion,
};
