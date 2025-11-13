// backend/models/Borrow.js
const { default: sequelize } = require('../Config/db');
const { DataTypes } = require('sequelize');
const User = require('./UserModel');
const Book = require('./bookModel');

const Borrow = sequelize.define('Borrow', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnDate: { type: DataTypes.DATE },
  status: { type: DataTypes.ENUM('borrowed', 'returned', 'overdue'), defaultValue: 'borrowed' },
});

Borrow.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Borrow;