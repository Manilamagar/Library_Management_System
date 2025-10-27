// backend/Config/database.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    dialect: 'mysql',       // <-- This is REQUIRED (mysql, postgres, sqlite, mssql, etc.)
    logging: false
});

module.exports = sequelize;