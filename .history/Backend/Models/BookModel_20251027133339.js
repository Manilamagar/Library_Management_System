// backend/models/Book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  available: { type: DataTypes.INTEGER, defaultValue: 1 },
});

module.exports = Book;