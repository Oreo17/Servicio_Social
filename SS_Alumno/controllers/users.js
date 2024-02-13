const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { models } = require("../models/index");
const { Op } = require("sequelize");
const { Calificacion } = require("../models/sql/calificacion");
const { Materia } = require("../models/sql/materia");
const { Curso } = require("../models/sql/curso");
const { encrypt } = require("../utils/handlePassword");
const PlanEstudio = models.PlanEstudio;
const Usuario = models.Usuario;
const Cuenta = models.Cuenta;

/**
 * Get info user
 * @param {*} req
 * @param {*} res
 */
const getInfoUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"], // Excluir el campo 'contrasena' de la respuesta
      },
    });
    const idAccount = dataUser.idCuenta;
    const dataAccount = await Cuenta.findOne({ where: { id: idAccount } });
    const idPlan = dataAccount.idPlanEstudio;
    const plan = await PlanEstudio.findOne({ where: { id: idPlan } });

    const planEstudio = await Cuenta.findOne({
      where: { id: idAccount },
      include: {
        model: models.PlanEstudio,
        attributes: ["id"],
      },
    });

    // Obtener las materias actuales del usuario
    const materiasActuales = await Calificacion.findAll({
      where: {
        cursada: 1, // Materias cursadas
        idCuenta: idAccount,
      },
      include: {
        model: models.Curso,
        include: {
          model: models.Materia,
          attributes: ["id", "nombre"],
        },
      },
    });

    const numReprobadas = await Calificacion.findAll({
      where: {
        idCuenta: idAccount,
        intentos: { [Op.gt]: 1 },
      },
      include: {
        model: models.Curso,
        include: {
          model: Materia,
          attributes: ["id", "nombre"],
        },
      },
    });

    const reprobadas = numReprobadas.length;

    const arrIdMateriasActuales = materiasActuales.map(
      (materia) => materia.Curso.Materium.id
    );

    // Obtener todas las materias que pertenecen al plan de estudios del usuario y no están en la lista de materias actuales
    const materiasNoCursadasSinCalificacion = await models.Materia.findAll({
      where: {
        idPlanEstudio: planEstudio.PlanEstudio.id, // Pertenecen al plan de estudios del usuario
        id: { [Op.notIn]: arrIdMateriasActuales }, // No están en la lista de materias actuales
      },
    });

    const arrMateriasNoCursadasSinCalificacionInfo =
      materiasNoCursadasSinCalificacion.map((materia) => ({
        id: materia.id,
        nombre: materia.nombre,
      }));

    const numeroDeMaterias = await Materia.count({
      where: {
        idPlanEstudio: 1,
      },
    });
    const faltanNum = arrMateriasNoCursadasSinCalificacionInfo.length;
    const resultado = ((numeroDeMaterias - faltanNum) / numeroDeMaterias) * 100;
    const porcentajeAvance = resultado.toFixed(2);

    const data = {
      id: dataUser.id,
      matricula: dataUser.matricula,
      nombre: dataAccount.nombre,
      apellidoPaterno: dataAccount.apellidoPaterno,
      apellidoMaterno: dataAccount.apellidoMaterno,
      carrera: plan.nombre,
      avance: porcentajeAvance,
      reprobadas,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

module.exports = {
  getInfoUser,
};
