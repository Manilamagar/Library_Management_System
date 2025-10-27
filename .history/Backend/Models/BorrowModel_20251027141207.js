// backend/models/Borrow.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const User = require('./User');
const Book = require('./Book');

const Borrow = sequelize.define('Borrow', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnDate: { type: DataTypes.DATE },
  status: { type: DataTypes.ENUM('borrowed', 'returned', 'overdue'), defaultValue: 'borrowed' },
});

Borrow.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Borrow;