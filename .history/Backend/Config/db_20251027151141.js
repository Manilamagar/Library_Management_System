// backend/Config/database.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(DB
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASS,      // Database password
  process.env.DB_HOST,      //Database host
  process.env.DB_PORT,      //Database port
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',       // <-- This is REQUIRED (mysql, postgres, sqlite, mssql, etc.)
    logging: false
  }
);

module.exports = sequelize;