const { sequelize } = require("../config/mysql");
const { DataTypes, Model } = require("sequelize");
const { Calificacion } = require("./sql/calificacion");
const { Usuario } = require("./sql/usuario");
const { Cuenta } = require("./sql/cuenta");
const { Curso } = require("./sql/curso");
const { Materia } = require("./sql/materia");
const { PlanEstudio } = require("./sql/planEstudio");

// Define las relaciones entre los modelos
/*
Calificacion.belongsTo(Curso, { foreignKey: 'idCurso' });
Calificacion.belongsTo(Cuenta, { foreignKey: 'idCuenta' });
Curso.belongsTo(Materia, { foreignKey: 'idMateria' });
Cuenta.belongsTo(Usuario, { foreignKey: 'idCuenta' });
Cuenta.belongsTo(PlanEstudio, { foreignKey: 'idPlanEstudio' });
*/

// Establecer la relación entre tutor y estudiantes
Usuario.belongsTo(Usuario, { foreignKey: "tutorId" });
Usuario.hasMany(Usuario, { foreignKey: "tutorId" });

Usuario.belongsTo(Cuenta, { foreignKey: "idCuenta" });
Cuenta.hasOne(Usuario, { foreignKey: "idCuenta" });

Cuenta.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });
PlanEstudio.hasMany(Cuenta, { foreignKey: "idPlanEstudio" });

Curso.belongsTo(Materia, { foreignKey: "idMateria" });
Materia.hasMany(Curso, { foreignKey: "idMateria" });

Curso.hasMany(Calificacion, { foreignKey: "idCurso" });
Calificacion.belongsTo(Curso, { foreignKey: "idCurso" });

Calificacion.belongsTo(Cuenta, { foreignKey: "idCuenta" });
Cuenta.hasMany(Calificacion, { foreignKey: "idCuenta" });

Materia.belongsTo(PlanEstudio, { foreignKey: "idPlanEstudio" });
//PlanEstudio.hasMany(Calificacion, { foreignKey: "idCuenta" });

// Exporta los modelos y las relaciones
module.exports = {
  models: {
    Calificacion,
    Usuario,
    Cuenta,
    Curso,
    Materia,
    PlanEstudio,
  },
  sequelize, // También puedes exportar la instancia de Sequelize si es necesario
};
