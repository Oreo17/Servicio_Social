const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { Curso } = require("../models/sql/curso");
const { Calificacion } = require("../models/sql/calificacion");

// Materias
/**
 * Get users
 * @param {*} req
 * @param {*} res
 */
const getCourse = async (req, res) => {
  try {
    const nrc = req.params.nrc;
    const data = await Curso.findOne({ where: { nrc: nrc } });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Get user
 * @param {*} req
 * @param {*} res
 */
const getCourses = async (req, res) => {
  try {
    const user = req.user;
    const data = await Curso.findAll();
    res.send({ data, user });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_COURSES");
  }
};

// Ok
const addStudentCourse = async (req, res) => {
  try {
    const idMateriaSearch = req.body.idMateria;
    const idCuenta = req.body.idCuenta;
    const curso = await Curso.findOne({
      where: { idMateria: idMateriaSearch },
    });
    if (!curso) {
      handleHttpError(res, "ERROR_COURSE_NOT_FOUND");
      console.error("No se encontró el curso para la materia");
      return;
    }
    const idCurso = curso.nrc;
    const crearCalificacion = await Calificacion.create({
      calificacion: 0,
      cursada: 0, // Materia aún no ha sido cursada
      idCurso,
      idCuenta,
    });
    res.send({ data: crearCalificacion });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_ADD_STUDENT_COURSE");
  }
};

/**
 * Add a new user
 * @param {*} req
 * @param {*} res
 */
const createCourse = async (req, res) => {
  try {
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_USER");
  }
};

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  addStudentCourse,
};
