const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("enextfuture", "root", "", {
  host: "localhost", 
  dialect: "mysql", 
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => console.log("Подключение к базе данных успешно установлено."))
  .catch((err) => console.error("Ошибка подключения к базе данных:", err));

module.exports = sequelize;
