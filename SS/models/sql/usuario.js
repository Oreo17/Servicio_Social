const { sequelize } = require("../../config/mysql");
const { DataTypes, Model } = require("sequelize");

// Definir el modelo para la tabla Users
//
class Usuario extends Model {}
Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      select: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idCuenta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Cuenta",
        key: "id",
      },
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Usuario",
        key: "id",
      },
    },
    eliminado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    timestamps: false, // Si no necesitas timestamps (created_at, updated_at)
    tableName: "usuario", // Nombre de la tabla en la base de datos
  }
);

module.exports = { Usuario };
