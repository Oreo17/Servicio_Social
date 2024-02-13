const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Object user
 * @param {*} user
 */
const tokenSign = async (user, userRole) => {
  try {
    const sign = jwt.sign(
      {
        _id: user.id,
        role: userRole,
        matricula: user.matricula,
      },
      JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    return sign;
  } catch (error) {
    console.error("Error al firmar el token:", error);
    throw new Error("Error al firmar el token");
  }
};

const verifyToken = async (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT);
  } catch (e) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, verifyToken, decodeSign };
