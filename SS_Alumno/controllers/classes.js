const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { models } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const Usuario = models.Usuario;
const Cuenta = models.Cuenta;
const PlanEstudio = models.PlanEstudio;
const Materia = models.Materia;
const Curso = models.Curso;
const Calificacion = models.Calificacion;

const getMateriasActuales = async (idCuenta) => {
  return models.Calificacion.findAll({
    where: {
      cursada: 0,
      idCuenta: idCuenta,
    },
    include: {
      model: models.Curso,
      include: {
        model: models.Materia,
        attributes: ["id", "nombre"],
      },
    },
  });
};

const getNext = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      include: {
        model: models.Cuenta,
        attributes: ["semestreActual"],
      },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
    });

    if (!dataUser) {
      handleHttpError(res, "ERROR_USER_OR_ACCOUNT_NOT_FOUND");
      return;
    }

    const idAccount = dataUser.idCuenta;

    const materiasActuales = await models.Calificacion.findAll({
      where: {
        cursada: 0,
        idCuenta: idAccount,
      },
      include: {
        model: models.Curso,
        include: {
          model: models.Materia,
          attributes: ["id"],
        },
      },
    });

    const materiasCursadas = await models.Calificacion.findAll({
      where: {
        cursada: 1,
        idCuenta: idAccount,
      },
      include: {
        model: models.Curso,
        include: {
          model: models.Materia,
          attributes: ["id"],
        },
      },
    });

    const arrIdMateriasActuales = materiasActuales.map(
      (materia) => materia.Curso.Materium.id
    );

    const arrIdMateriasCursadas = materiasCursadas.map(
      (materia) => materia.Curso.Materium.id
    );

    /*
    const resultado = await Materia.findAll({
      where: {
        idPlanEstudio: 1,
        materiaAnterior: {
          [Op.in]: [...arrIdMateriasCursadas],
        },
        id: {
          [Op.notIn]: [...arrIdMateriasActuales, ...arrIdMateriasCursadas],
        },
      },
      order: [
        ["id", "ASC"], // Ordenar por id en orden ascendente
      ],
    });
    */

    const resultado = await Materia.findAll({
      where: {
        idPlanEstudio: 1,
        [Op.or]: [
          { materiaAnterior: { [Op.in]: arrIdMateriasCursadas } },
          { materiaAnterior: null, materiaSiguiente: null },
        ],
        id: {
          [Op.notIn]: [...arrIdMateriasActuales, ...arrIdMateriasCursadas],
        },
      },
      order: [["id", "ASC"]],
    });

    const resultadoFinal = resultado.map(async (materia) => {
      const nombreMateriaAnterior = await getNombreMateriaPorId(
        materia.materiaAnterior
      );
      console.log(nombreMateriaAnterior);
      return {
        id: materia.id,
        semestre: materia.semestre,
        nombre: materia.nombre,
        materiaAnterior: nombreMateriaAnterior,
      };
    });

    const resultados = await Promise.all(resultadoFinal);
    // Enviar la respuesta
    res.send({ next: resultados });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

const failed = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      include: {
        model: models.Cuenta,
        attributes: ["semestreActual"],
      },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
    });

    if (!dataUser) {
      handleHttpError(res, "ERROR_USER_OR_ACCOUNT_NOT_FOUND");
      return;
    }

    const idAccount = dataUser.idCuenta;

    const reprobadas = await Calificacion.findAll({
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

    const infoReprobadas = reprobadas.map((element) => {
      return {
        nombre: element.Curso.Materium.nombre,
        intentos: element.intentos,
        calificacion: element.calificacion,
      };
    });
    //console.log(infoReprobadas);
    res.send({ data: infoReprobadas });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_FAILED");
  }
};

const getNombreMateriaPorId = async (idMateria) => {
  try {
    const materia = await Materia.findOne({
      where: { id: idMateria },
      attributes: ["nombre"],
    });

    if (materia) {
      return materia.nombre;
    } else {
      return null; // O un valor predeterminado si prefieres
    }
  } catch (error) {
    console.error(error);
    // Manejar el error según tus necesidades, por ejemplo, lanzando una excepción
    throw new Error("Error al obtener el nombre de la materia");
  }
};

// ok - Get detail current, name previous
const getCurrent2 = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
    });
    const idAccount = dataUser.idCuenta;
    models.Calificacion.findAll({
      where: {
        cursada: 0,
        idCuenta: idAccount,
      },
      include: [
        {
          model: Curso,
          include: [
            {
              model: Materia,
              attributes: [
                "id",
                "nombre",
                "semestre",
                "materiaAnterior",
                "materiaSiguiente",
              ],
            },
          ],
        },
      ],
    }).then(async (materiasActuales) => {
      console.log("Actuales");
      // En materiasActuales tienes la información de las materias actuales y sus detalles
      const arrMateriasActuales = await Promise.all(
        materiasActuales.map(async (materia) => {
          //console.log(materia);
          const materiaActual = materia.Curso.Materium;
          const nrc = materia.Curso.nrc;
          const materiaAnterior = materiaActual.materiaAnterior;
          //console.log(nrc);
          let nombreMateriaAnterior = null;
          if (materiaAnterior) {
            const materiaAnteriorIds = materiaAnterior.split(";").map(Number);
            const materiasAnteriores = await Materia.findAll({
              where: { id: materiaAnteriorIds },
              attributes: ["nombre"],
            });
            nombreMateriaAnterior = materiasAnteriores
              .map((m) => m.nombre)
              .join(", ");
          }
          return {
            id: materiaActual.id,
            nombre: materiaActual.nombre,
            materiaNRC: nrc,
            semestre: materiaActual.semestre,
            materiaAnterior: nombreMateriaAnterior,
          };
        })
      );

      // Ahora, puedes consultar las materias siguientes
      const arrIdMateriasSiguientes = materiasActuales.map((materia) => {
        const materiaSiguiente = materia.Curso.Materium.materiaSiguiente;
        return (materiaSiguiente && materiaSiguiente.split(";")) || [];
      });

      // Las materias siguientes son un array de arrays, necesitas aplanarlo
      const arrMateriasSiguientes = [].concat(...arrIdMateriasSiguientes);

      console.log("Materias Actuales:", arrMateriasActuales);
      console.log("Materias Siguientes (IDs):", arrMateriasSiguientes);
      res.send({ current: arrMateriasActuales });
    });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

// Función para obtener el nombre de la materia anterior
function obtenerNombreMateriaAnterior(materiaAnterior, materiasMap) {
  if (materiaAnterior) {
    const requisitosArr = materiaAnterior.split(";").map(Number);
    const nombresRequisitos = requisitosArr
      .map((requisitoId) => materiasMap.get(requisitoId))
      .filter((nombre) => nombre !== undefined);
    return nombresRequisitos.join(", ");
  }
  return "";
}

// Datos userMap
const getClasses = async (req, res) => {
  try {
    const id = req.params.id;
    const dataUser = await Usuario.findOne({
      where: { id: id },
      attributes: { exclude: ["contrasena", "eliminado"] },
    });
    const idAccount = dataUser.idCuenta;

    // Obtén todas las calificaciones del usuario, incluyendo detalles de los cursos y las materias
    const calificaciones = await Calificacion.findAll({
      where: {
        idCuenta: idAccount,
      },
      include: [
        {
          model: Curso,
          include: {
            model: Materia,
            attributes: ["id", "nombre"],
          },
        },
      ],
      order: [
        [Curso, Materia, "id", "ASC"], // Ordenar por el id de Materia en orden ascendente
      ],
    });
    //console.log(calificaciones[0].Curso.idMateria);
    // Mapea las calificaciones
    const clases = calificaciones.map((calificacion) => ({
      id: calificacion.Curso.idMateria,
      materia: calificacion.Curso.Materium.nombre,
      cursada: calificacion.cursada,
      calificacion: calificacion.calificacion,
      intentos: calificacion.intentos,
    }));

    res.send({ clases });
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_GET_CLASSES");
  }
};

module.exports = {
  getNext,
  getCurrent2,
  getClasses,
  failed,
};
