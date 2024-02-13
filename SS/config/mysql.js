const { Sequelize } = require("sequelize");
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host: "192.168.100.2",
  dialect: "mysql",
});

const dbConnectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Authenticated - MySQL Connect");
  } catch (e) {
    console.log("MySQL Error", e);
  }
};

module.exports = { sequelize, dbConnectMySQL };
