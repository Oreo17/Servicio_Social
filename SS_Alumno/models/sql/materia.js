const { sequelize } = require("../../config/mysql");
const { DataTypes, Model } = require("sequelize");

// Limpia la caché de Sequelize
sequelize.models = {};

class Materia extends Model {}

Materia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    creditos: {
      type: DataTypes.INTEGER,
    },
    semestre: {
      type: DataTypes.INTEGER,
    },
    materiaAnterior: {
      type: DataTypes.STRING,
    },
    materiaSiguiente: {
      type: DataTypes.STRING,
    },
    idPlanEstudio: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references:{
        model: 'PlanEstudio',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: "Materia",
    timestamps: false, // Si no necesitas timestamps
    tableName: "materia",
  }
);


module.exports = { Materia };