const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");

const { models } = require("../models/index");
const Usuario = models.Usuario;

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToekn = await verifyToken(token);

    if (!dataToekn._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    /*
    const user = await Usuario.findOne({
      where: { id: dataToekn._id },
    });
    req.user = user;
    */

    next();
  } catch (err) {
    handleHttpError(res, "NOT_SESION", 401);
  }
};

module.exports = authMiddleware;
