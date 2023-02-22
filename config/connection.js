const Sequelize = require('sequelize');
require('dotenv').config();

// This is connecting to our remote Database, If that can't establish a connection run locally. worse case, throw error
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    port: process.env.MYSQLPORT,
  }
)
  ? new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
      }
    )
  : console.log(Sequelize.Error);

module.exports = sequelize;
