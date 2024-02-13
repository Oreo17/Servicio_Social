const { sequelize } = require("../../config/mysql");
const { DataTypes, Model } = require("sequelize");

class Calificacion extends Model {}

Calificacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    cursada: {
      type: DataTypes.STRING,
    },
    intentos: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    idCurso: {
      type: DataTypes.INTEGER,
      references: {
        model: "Curso",
        key: "id",
      },
    },
    idCuenta: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cuenta",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Calificacion",
    timestamps: false, // Si no necesitas timestamps
    tableName: "calificacion",
  }
);

module.exports = { Calificacion };
