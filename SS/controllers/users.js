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
 * Add a new Account
 * @param {*} req
 * @param {*} res
 */
const createAccount = async (req, res) => {
  try {
    const body = req.body;
    const data = await Cuenta.create(body);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_USER");
  }
};

/**
 * Add a new user
 * @param {*} req
 * @param {*} res
 */
const createUsers = async (req, res) => {
  try {
    const password = await encrypt(req.body.contrasena);
    const body = { ...req.body, contrasena: password };
    const user = await Usuario.create(body);
    const addStudentCourses = await Calificacion.bulkCreate([
      {
        calificacion: 0,
        cursda: 0,
        idCurso: 10054,
        idCuenta: user.id,
      },
      {
        calificacion: 0,
        cursda: 0,
        idCurso: 10055,
        idCuenta: user.id,
      },
      {
        calificacion: 0,
        cursda: 0,
        idCurso: 10056,
        idCuenta: user.id,
      },
      {
        calificacion: 0,
        cursda: 0,
        idCurso: 10057,
        idCuenta: user.id,
      },
      {
        calificacion: 0,
        cursda: 0,
        idCurso: 10058,
        idCuenta: user.id,
      },
    ]);
    res.send({ user });
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_USER");
  }
};

/**
 * Get users
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const data = await Usuario.findAll();
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_USER");
  }
};

const getTutores = async (req, res) => {
  try {
    const data = await Usuario.findAll({
      //where: { tipo: 1 },
    });

    console.log("Resultado de la búsqueda de tutores:", tutores);
    res.send({ data });
  } catch (error) {
    console.error("Error al buscar tutores:", error);
    handleHttpError(res, "ERROR_GET_TUTORES");
  }
};

/**
 * Get user
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  try {
    //req = matchedData(req);
    const id = req.params.id;
    const data = await Usuario.findOne({ where: { id: id } });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, error);
  }
};

// Angular
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

const getInfoUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      //where:{},
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
      include: [
        {
          model: Cuenta,
          where: { tipo: 0 },
          attributes: ["id", "nombre", "apellidoPaterno", "apellidoMaterno"],
          include: {
            model: PlanEstudio,
            attributes: ["nombre"],
          },
          order: [["id", "ASC"]],
        },
      ],
    });
    //console.log(usuarios[0]);
    const dataUsuarios = usuarios.map((usuario) => {
      //console.log(usuario);
      // Sigo sin saber porqué cambia el nombre al hacer la relacion Cuenta->Cuentum
      const idAccount = usuario.Cuentum.id;
      const idPlan = usuario.Cuentum.idPlanEstudio;

      return {
        id: usuario.id,
        matricula: usuario.matricula,
        nombre: usuario.Cuentum.nombre,
        apellidoPaterno: usuario.Cuentum.apellidoPaterno,
        apellidoMaterno: usuario.Cuentum.apellidoMaterno,
        carrera: usuario.Cuentum.PlanEstudio.nombre,
      };
    });

    res.send({ data: dataUsuarios });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

const getInfoUsuariosTutor = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarios = await Usuario.findAll({
      where: { tutorId: id },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
      include: [
        {
          model: Cuenta,
          where: { tipo: 0 },
          attributes: ["id", "nombre", "apellidoPaterno", "apellidoMaterno"],
          include: {
            model: PlanEstudio,
            attributes: ["nombre"],
          },
          order: [["id", "ASC"]],
        },
      ],
    });
    //console.log(usuarios[0]);
    const dataUsuarios = usuarios.map((usuario) => {
      //console.log(usuario);
      // Sigo sin saber porqué cambia el nombre al hacer la relacion Cuenta->Cuentum
      const idAccount = usuario.Cuentum.id;
      const idPlan = usuario.Cuentum.idPlanEstudio;

      return {
        id: usuario.id,
        matricula: usuario.matricula,
        nombre: usuario.Cuentum.nombre,
        apellidoPaterno: usuario.Cuentum.apellidoPaterno,
        apellidoMaterno: usuario.Cuentum.apellidoMaterno,
        carrera: usuario.Cuentum.PlanEstudio.nombre,
      };
    });

    res.send({ data: dataUsuarios });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

const getInfoUsuariosQuery = async (req, res) => {
  try {
    const query = req.params.query;

    const usuarios = await Usuario.findAll({
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
      include: [
        {
          model: Cuenta,
          where: { tipo: 0 },
          attributes: ["id", "nombre", "apellidoPaterno", "apellidoMaterno"],
          as: "Cuentum",
          include: {
            model: PlanEstudio,
            attributes: ["nombre"],
            as: "PlanEstudio",
          },
        },
      ],
      where: {
        [Op.or]: [
          {
            matricula: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.nombre$": {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.apellidoPaterno$": {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.apellidoMaterno$": {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      order: [["id", "ASC"]],
    });

    const dataUsuarios = usuarios.map((usuario) => {
      return {
        id: usuario.id,
        matricula: usuario.matricula,
        nombre: usuario.Cuentum.nombre,
        apellidoPaterno: usuario.Cuentum.apellidoPaterno,
        apellidoMaterno: usuario.Cuentum.apellidoMaterno,
        carrera: usuario.Cuentum.PlanEstudio.nombre,
      };
    });

    res.send({ data: dataUsuarios });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

const getInfoUsuariosQueryTutor = async (req, res) => {
  try {
    const query = req.params.query;
    const id = req.params.id;

    const usuarios = await Usuario.findAll({
      where: { tutorId: id },
      attributes: {
        exclude: ["contrasena", "eliminado"],
      },
      include: [
        {
          model: Cuenta,
          where: { tipo: 0 },
          attributes: ["id", "nombre", "apellidoPaterno", "apellidoMaterno"],
          as: "Cuentum",
          include: {
            model: PlanEstudio,
            attributes: ["nombre"],
            as: "PlanEstudio",
          },
        },
      ],
      where: {
        [Op.or]: [
          {
            matricula: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.nombre$": {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.apellidoPaterno$": {
              [Op.like]: `%${query}%`,
            },
          },
          {
            "$Cuentum.apellidoMaterno$": {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      order: [["id", "ASC"]],
    });

    const dataUsuarios = usuarios.map((usuario) => {
      return {
        id: usuario.id,
        matricula: usuario.matricula,
        nombre: usuario.Cuentum.nombre,
        apellidoPaterno: usuario.Cuentum.apellidoPaterno,
        apellidoMaterno: usuario.Cuentum.apellidoMaterno,
        carrera: usuario.Cuentum.PlanEstudio.nombre,
      };
    });

    res.send({ data: dataUsuarios });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

const updateSemester = async (req, res) => {
  try {
    // Obtener las materias del semestre anterior que el usuario ha cursado
    const idUser = req.params.id;
    const materiasSemestreAnterior = await Calificacion.findAll({
      where: {
        cursada: 1, // Materias cursadas
        idCuenta: idUser,
      },
      include: {
        model: Curso,
        include: {
          model: Materia,
          attributes: ["semestre"],
        },
      },
    });
    // Verificar que todas las materias del semestre anterior tienen una calificación diferente de 0
    const todasCursadas = materiasSemestreAnterior.every(
      (materia) => materia.calificacion !== 0
    );
    console.log(todasCursadas);
    if (todasCursadas) {
      const cuenta = await Cuenta.findByPk(idUser);
      const nuevoSemestre = cuenta.semestreActual + 1;
      console.log(cuenta);
      await Cuenta.update(
        { semestreActual: nuevoSemestre },
        { where: { id: idUser } }
      );

      console.log(
        `El usuario ${idUser} ha avanzado al semestre ${nuevoSemestre}`
      );
      res.send({ semestreActual: nuevoSemestre });
    }
  } catch (error) {
    handleHttpError(error);
    console.error(error);
  }
};

module.exports = {
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
};
