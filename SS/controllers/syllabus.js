const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { PlanEstudio } = require("../models/sql/planEstudio");

// Plan de estudios
/**
 * Get users
 * @param {*} req
 * @param {*} res
 */
const getPlan = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PlanEstudio.findOne({
      where: { id: id },
      attributes: ["id", "nombre"],
    });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

/**
 * Get users
 * @param {*} req
 * @param {*} res
 */
const getPlanes = async (req, res) => {
  try {
    const data = await PlanEstudio.findAll({
      attributes: ["id", "nombre"],
    });
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_SYLLABUS");
  }
};

module.exports = {
  getPlan,
  getPlanes,
};
