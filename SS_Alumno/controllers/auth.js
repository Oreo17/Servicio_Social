const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { compare, encrypt } = require("../utils/handlePassword");
const { models } = require("../models/index");
const { tokenSign, decodeSign } = require("../utils/handleJWT");
const { Cuenta } = require("../models/sql/cuenta");
const Usuario = models.Usuario;

/**
 * Register a new user
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req);
    // Checar lo de la columna token
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await Usuario.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ password });
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/**
 * Login User
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req, res) => {
  try {
    console.log(req.body);
    const user = await Usuario.findOne({
      where: { matricula: req.body.matricula },
    });
    if (!user) {
      handleHttpError(res, "ERROR_USER_NOT_EXIST", 404);
      return;
    }
    const hashPassword = user.contrasena;
    const check = await compare(req.body.password, hashPassword); // Asegúrate de que estás comparando las contraseñas correctamente
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }
    const infoAccount = await Cuenta.findOne({ where: { id: user.id } });
    const tipo = infoAccount.tipo;
    //console.log(infoAccount);
    const token = await tokenSign(user, tipo);
    //console.log(user);
    // Actualiza el campo 'token' en el modelo Usuario con el token generado
    await Usuario.update(
      { token: token },
      { where: { matricula: user.matricula } }
    );
    const data = {
      idUser: user.id,
      idAccount: user.idCuenta,
      matricula: user.matricula,
      tipo,
      //tokenBD: user.token,
      token,
    };
    res.json({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

const createToken = async (req, res) => {
  try {
    console.log(req.body);
    const pass = await encrypt(req.body.contrasena);
    const token = await tokenSign({ userId: 8 }, "1213ad", {
      expiresIn: "1h",
    });
    const dTk = decodeSign(token);
    res.send({ dTk });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_TOKEN");
  }
};

module.exports = {
  loginCtrl,
  registerCtrl,
  createToken,
};
