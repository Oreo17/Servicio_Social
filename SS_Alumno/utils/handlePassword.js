const bcryptjs = require("bcryptjs");

/**
 * Password encryption
 * @param {*} req
 * @param {*} res
 */
const encrypt = async (passwordPlain) => {
  try {
    const hash = await bcryptjs.hash(passwordPlain, 10); // Cambié 53 por 10 como costo del hash para ejemplo
    return hash;
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

/**
 * Compares two passwords (hash, plain)
 * @param {*} req
 * @param {*} res
 */
const compare = async (passswordPlain, hashPassword) => {
  try {
    return await bcryptjs.compare(passswordPlain, hashPassword);
  } catch (e) {
    console.log(e);
    return;
  }
};

module.exports = { encrypt, compare };
