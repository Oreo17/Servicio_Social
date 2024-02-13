const { handleHttpError } = require("../utils/handleError");

/**
 * Array role []
 * @param {*} rol
 * @returns
 */
const checkRol = (rol) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolByUser = user.role;
    const checkValueRol = rol.some((rolSingle) =>
      rolByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONED", 403);
      return;
    }
    next();
  } catch (err) {
    handleHttpError(res, "ERROR_PERMISION", 403);
  }
};

module.export = checkRol;
