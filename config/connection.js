const Sequelize = require('sequelize');
require('dotenv').config();

// This is connecting to our remote Database, If that can't establish a connection run locally. worse case, throw error
// const sequelize = new Sequelize(
//   process.env.MYSQLDATABASE,
//   process.env.MYSQLUSER,
//   process.env.MYSQLPASSWORD,
//   {
//     host: process.env.MYSQLHOST,
//     dialect: 'mysql',
//     port: process.env.MYSQLPORT,
//   }
// );
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
});
module.exports = sequelize;
