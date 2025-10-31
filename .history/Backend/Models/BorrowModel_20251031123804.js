// backend/models/Borrow.js

const User = require('./UserModel');
const Book = require('./BookModel');

const Borrow = sequelize.define('Borrow', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnDate: { type: DataTypes.DATE },
  status: { type: DataTypes.ENUM('borrowed', 'returned', 'overdue'), defaultValue: 'borrowed' },
});

Borrow.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Borrow;