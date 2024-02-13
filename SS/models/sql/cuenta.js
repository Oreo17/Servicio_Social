const { sequelize } = require("../../config/mysql");
const { DataTypes, Model } = require("sequelize");

class Cuenta extends Model {}
Cuenta.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idPlanEstudio: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references:{
        model: 'PlanEstudio',
        key: 'id'
      }
    },
    semestreActual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    eliminado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cuenta",
    timestamps: false, // Desactivado timestamps (created_at, updated_at) para que coincida con la definición de la base de datos
    tableName: "cuenta",
  }
);

//PlanEstudio.belongsTo(Cuenta, { foreignKey: "idPlanEstudio" });

//


module.exports = { Cuenta };
