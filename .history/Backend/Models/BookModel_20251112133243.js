// backend/models/Book.js

const { DataTypes } = require("sequelize");
const { default: sequelize } = require("../Config/db");


const Book = sequelize.define('Book', {
  Book_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
  Category: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  year_published: { type: DataTypes.INTEGER, allowNull: false },
  Description: { type: DataTypes.TEXT, allowNull: true },
  
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  available: { type: DataTypes.INTEGER, defaultValue: 1 },
});

module.exports = Book;