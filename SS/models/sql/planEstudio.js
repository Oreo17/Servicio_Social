const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/mysql");

// Limpia la caché de Sequelize
sequelize.models = {};

class PlanEstudio extends Model {} // Syllabus

PlanEstudio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "PlanEstudio",
    timestamps: false, // Si no necesitas timestamps
    tableName: "planestudio",
  }
);


module.exports = { PlanEstudio };
