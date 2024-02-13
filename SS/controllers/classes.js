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

const getCurrentClasses = async (req, res) => {
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

    const idPlanEstudio = dataAccount.idPlanEstudio;
    const nombrePlanEstudio = await PlanEstudio.findOne({
      where: { id: idPlanEstudio },
      attributes: ["nombre"],
    });

    const materias = await Materia.findAll({
      include: [
        {
          model: Curso,
          attributes: ["nrc"],
          include: [
            {
              model: Calificacion,
              where: {
                cursada: 1, // Asegúrate de que "cursada" sea la columna correcta en tu modelo Calificacion
                idCuenta: idAccount, //
              },
            },
          ],
        },
        {
          model: PlanEstudio,
          where: {
            id: idPlanEstudio,
          },
        },
      ],
    });

    const current = await Materia.findAll({
      include: [
        {
          model: PlanEstudio,
          where: {
            id: idPlanEstudio,
          },
        },
        {
          model: Curso,
          attributes: ["nrc"],
          include: [
            {
              model: Calificacion,
              where: {
                cursada: 1, // Asegúrate de que "cursada" sea la columna correcta en tu modelo Calificacion
                idCuenta: idAccount, //
              },
            },
          ],
        },
      ],
    });

    console.log(`ID -> ${idAccount} - Plan estudios ${idPlanEstudio}`); //

    res.send({
      dataUser,
      //dataAccount,
      idAccount,
      idPlanEstudio,
      //nombrePlanEstudio,
      //materias,
      current,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

// Ok current
const getCurrent = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"], // Excluir el campo 'contrasena' de la respuesta
      },
    });
    const idAccount = dataUser.idCuenta;
    Calificacion.findAll({
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
                "nombre",
                "semestre",
                "materiaAnterior",
                "materiaSiguiente",
              ],
            },
          ],
        },
      ],
    }).then((materiasActuales) => {
      console.log("Actuales");
      console.log(materiasActuales);
      // En materiasActuales tienes la información de las materias actuales y sus detalles
      const arrMateriasActuales = materiasActuales.map((materia) => ({
        id: materia.Curso.idMateria,
        nombre: materia.Curso.Materium.nombre,
        semestre: materia.Curso.Materium.semestre,
        materiaAnterior: materia.Curso.Materium.materiaAnterior,
      }));
      console.log(materiasActuales);
      // Ahora, puedes consultar las materias siguientes
      const arrIdMateriasSiguientes = materiasActuales.map((materia) => {
        console.log(materia);
        const materiaSiguiente = materia.materiaSiguiente;
        return (materiaSiguiente && materiaSiguiente.split(";")) || [];
      });

      // Las materias siguientes son un array de arrays, necesitas aplanarlo
      const arrMateriasSiguientes = [].concat(...arrIdMateriasSiguientes);

      // arrMateriasSiguientes ahora contiene los IDs de las materias siguientes

      console.log("Materias Actuales:", arrMateriasActuales);
      console.log("Materias Siguientes (IDs):", arrMateriasSiguientes);
      res.send({ current: arrMateriasActuales });
    });
  } catch (errors) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

// OK Next
const getNextTest = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"], // Excluir el campo 'contrasena' de la respuesta
      },
    });
    const idAccount = dataUser.idCuenta;
    const materiasActuales = await models.Calificacion.findAll({
      where: {
        cursada: 0, // Materias no cursadas
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

    // Obtener todas las materias siguientes
    const todasLasMateriasSiguientes = await models.Materia.findAll({
      where: {
        id: { [Op.notIn]: arrIdMateriasActuales }, // No están en la lista de materias actuales
      },
    });

    // Filtrar las materias siguientes que tienen requisitos
    const materiasSiguientesConRequisitos = todasLasMateriasSiguientes.filter(
      (materia) => {
        const requisitos = materia.materiaAnterior;
        if (requisitos) {
          const requisitosArr = requisitos.split(";").map(Number);
          return requisitosArr.some((requisito) =>
            arrIdMateriasActuales.includes(requisito)
          );
        }
        return false;
      }
    );

    const arrMateriasSiguientesConRequisitosInfo =
      materiasSiguientesConRequisitos.map((materia) => ({
        id: materia.id,
        nombre: materia.nombre,
        semestre: materia.semestre,
        materiaAnterior: materia.materiaAnterior,
      }));

    res.send({ next: arrMateriasSiguientesConRequisitosInfo });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

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

const getMateriasDisponibles = async (idAccount) => {
  // Obtén todas las materias del plan de estudios del usuario
  const todasLasMaterias = await models.Materia.findAll({
    where: {
      idPlanEstudio: 1, // Reemplaza con el ID correcto del plan de estudios del usuario
    },
  });

  // Obtén las materias actuales del usuario
  const materiasActuales = await getMateriasActuales(idAccount);

  // Filtra las materias que no tienen requisitos y no han sido cursadas
  const materiasDisponibles = todasLasMaterias.filter((materia) => {
    if (materiasActuales.some((m) => m.Curso.Materium.id === materia.id)) {
      return false; // La materia ya está siendo cursada
    }

    if (materia.materiaAnterior) {
      const requisitosArr = materia.materiaAnterior.split(";").map(Number);
      if (
        !requisitosArr.every((requisito) => {
          const requisitoCursado = materiasActuales.some(
            (m) => m.Curso.Materium.id === requisito
          );
          return requisitoCursado;
        })
      ) {
        return false; // No se cumplen los requisitos
      }
    }

    return true;
  });

  return materiasDisponibles;
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

// Actual agregado
const getNextas = async (req, res) => {
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
    const semestreActual = dataUser.Cuentum.semestreActual;

    const materiasActuales = await models.Calificacion.findAll({
      where: {
        cursada: 0,
        idCuenta: idAccount,
      },
      include: {
        model: models.Curso,
        include: {
          model: models.Materia,
          attributes: ["id", "nombre", "semestre"],
        },
      },
    });

    const arrIdMateriasActuales = materiasActuales.map(
      (materia) => materia.Curso.Materium.id
    );

    const todasLasMateriasSiguientes = await models.Materia.findAll({
      where: {
        id: { [Op.notIn]: arrIdMateriasActuales },
        semestre: semestreActual,
        idPlanEstudio: 1,
      },
    });

    // Enviar la respuesta, al parecer estas son las correctas
    res.send({ next: todasLasMateriasSiguientes });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

const nextFunctionComplete = async (req, res) => {
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
    const semestreActual = dataUser.Cuentum.semestreActual; // semestreActual

    const materiasActuales = await models.Calificacion.findAll({
      where: {
        cursada: 0,
        idCuenta: idAccount,
      },
      include: {
        model: models.Curso,
        include: {
          model: models.Materia,
          attributes: ["id", "nombre", "semestre"],
        },
      },
    });

    const arrIdMateriasActuales = materiasActuales.map(
      (materia) => materia.Curso.Materium.id
    );

    const todasLasMateriasSiguientes = await models.Materia.findAll({
      where: {
        id: { [Op.notIn]: arrIdMateriasActuales },
        semestre: semestreActual,
        idPlanEstudio: 1,
      },
    });

    // Filtra las materias siguientes con requisitos
    const materiasSiguientesConRequisitos = todasLasMateriasSiguientes.filter(
      (materia) => {
        const requisitos = materia.materiaAnterior;
        if (requisitos) {
          const requisitosArr = requisitos.split(";").map(Number);
          return requisitosArr.some((requisito) =>
            arrIdMateriasActuales.includes(requisito)
          );
        }
        return false;
      }
    );

    // Crear un mapa para buscar nombres de materias por ID
    const materiasMap = new Map();
    for (const materia of materiasActuales) {
      materiasMap.set(materia.Curso.Materium.id, materia.Curso.Materium.nombre);
    }

    // Construir la respuesta
    const arrMateriasSiguientesConRequisitosInfo =
      materiasSiguientesConRequisitos.map((materia) => ({
        id: materia.id,
        nombre: materia.nombre,
        semestre: materia.semestre,
        materiaAnterior: materia.materiaAnterior,
        nombreMateriaAnterior: obtenerNombreMateriaAnterior(
          materia.materiaAnterior,
          materiasMap
        ),
      }));

    // Enviar la respuesta, al parecer estas son las correctas
    res.send({ next: todasLasMateriasSiguientes });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
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

const mapUser = async (req, res) => {
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

    const idPlanEstudio = dataAccount.idPlanEstudio;

    const classes = await Materia.findAll({
      include: [
        {
          model: PlanEstudio,
          where: {
            id: idPlanEstudio,
          },
        },
        {
          model: Curso,
          attributes: ["nrc"],
          include: [
            {
              model: Calificacion,
              where: {
                cursada: 1, // Asegúrate de que "cursada" sea la columna correcta en tu modelo Calificacion
                idCuenta: idAccount, //
              },
            },
          ],
        },
      ],
    });

    console.log(`ID -> ${idAccount} - Plan estudios ${idPlanEstudio}`); //

    res.send({
      classes,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

//All next OK
const getAllMateriasSiguientes = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"], // Excluir el campo 'contrasena' de la respuesta
      },
    });
    const idAccount = dataUser.idCuenta;

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

    res.send({ arrMateriasNoCursadasSinCalificacionInfo });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

// Get Next2V - Usada
const getNext2V = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
    });
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
          attributes: ["id", "nombre"], // Incluye el nombre de la materia
        },
      },
    });

    const arrIdMateriasActuales = materiasActuales.map(
      (materia) => materia.Curso.Materium.id
    );

    const todasLasMateriasSiguientes = await models.Materia.findAll({
      where: {
        id: { [Op.notIn]: arrIdMateriasActuales },
      },
    });

    const materiasSiguientesConRequisitos = todasLasMateriasSiguientes.filter(
      (materia) => {
        const requisitos = materia.materiaAnterior;
        if (requisitos) {
          const requisitosArr = requisitos.split(";").map(Number);
          return requisitosArr.some((requisito) =>
            arrIdMateriasActuales.includes(requisito)
          );
        }
        return false;
      }
    );

    // Crear un mapa para buscar nombres de materias por ID
    const materiasMap = new Map();
    for (const materia of materiasActuales) {
      materiasMap.set(materia.Curso.Materium.id, materia.Curso.Materium.nombre);
    }

    const arrMateriasSiguientesConRequisitosInfo =
      materiasSiguientesConRequisitos.map((materia) => ({
        id: materia.id,
        nombre: materia.nombre,
        semestre: materia.semestre,
        materiaAnterior: materia.materiaAnterior,
        nombreMateriaAnterior: obtenerNombreMateriaAnterior(
          materia.materiaAnterior,
          materiasMap
        ),
      }));

    res.send({ next: arrMateriasSiguientesConRequisitosInfo });
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

// Porcentaje avance de acada alumno
const percentage = async (req, res) => {
  try {
    const idUser = req.params.id;
    const dataUser = await models.Usuario.findOne({
      where: { id: idUser },
      attributes: {
        exclude: ["contrasena", "eliminado"], // Excluir el campo 'contrasena' de la respuesta
      },
    });
    const idAccount = dataUser.idCuenta;

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

    res.send({ porcentajeAvance });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_GET_CURRENT");
  }
};

// Mostrar las clases disponibles
const obtenerMateriasDisponibles = async (req, res) => {
  try {
    const idUser = req.params.id;

    // Obtén todas las materias que pertenecen al plan de estudios
    const todasLasMaterias = await Materia.findAll({
      where: {
        idPlanEstudio: 1, // En nuestro caso solo es uno
      },
    });

    // Obtén las materias que el usuario ya ha cursado o está cursando
    const materiasCursadas = await Calificacion.findAll({
      where: {
        idCuenta: idUser,
      },
      include: {
        model: Curso,
        include: {
          model: Materia,
          attributes: ["id", "materiaAnterior"],
        },
      },
    });

    const arrMateriasCursadas = materiasCursadas.map(
      (calificacion) => calificacion.Curso.Materium
    );

    // Materias sin requisitos
    const materiasDisponibles = todasLasMaterias.filter(
      (materia) => !materia.materiaAnterior
    );

    // Materias que el usuario no cursado
    const materiasNoCursadas = materiasDisponibles.filter((materia) => {
      const yaCursada = arrMateriasCursadas.some(
        (materiaCursada) =>
          materiaCursada.id === materia.id &&
          materiaCursada.calificacion !== null
      );
      return !yaCursada;
    });

    const arrMateriasDisponiblesInfo = materiasNoCursadas.map((materia) => ({
      id: materia.id,
      nombre: materia.nombre,
      creditos: materia.creditos,
      semestre: materia.semestre,
    }));

    console.log(
      "Materias disponibles para cursar:",
      arrMateriasDisponiblesInfo
    );
    res.send({ data: arrMateriasDisponiblesInfo });
  } catch (error) {
    console.error("Error al obtener materias disponibles:", error);
    handleHttpError(res, "ERROR_GET_AVAILABLE");
  }
};

module.exports = {
  getCurrent,
  getNext,
  getCurrent2,
  getNext2V,
  getClasses,
  obtenerMateriasDisponibles,
  failed,
};
