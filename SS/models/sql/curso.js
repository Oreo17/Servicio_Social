const { sequelize } = require("../../config/mysql");
const { DataTypes, Model } = require("sequelize");

class Curso extends Model {}

Curso.init(
  {
    nrc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCurso: {
      type: DataTypes.STRING,
    },
    docente: {
      type: DataTypes.INTEGER,
    },
    cupo: {
      type: DataTypes.INTEGER,
    },
    inscritos: {
      type: DataTypes.INTEGER,
    },
    idMateria: {
      type: DataTypes.BIGINT,
      references:{
        model: 'Materia',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: "Curso",
    timestamps: false, // Si no necesitas timestamps
    tableName: "curso",
  }
);


module.exports = { Curso };
