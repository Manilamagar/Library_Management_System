const { DataTypes, Model } = require('sequelize');
const sequelize4 = require('../Config/db');
const Book = require('./Book');
const Student2 = require('./Student');


class Issue extends Model {}
Issue.init({
issue_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
issue_date: { type: DataTypes.DATEONLY },
due_date: { type: DataTypes.DATEONLY },
return_date: { type: DataTypes.DATEONLY },
status: { type: DataTypes.ENUM('issued', 'returned'), defaultValue: 'issued' }
}, { sequelize: sequelize4, modelName: 'issued_book', tableName: 'issued_books', timestamps: false });


Issue.belongsTo(Book, { foreignKey: 'book_id' });
Issue.belongsTo(Student2, { foreignKey: 'student_id' });
Book.hasMany(Issue, { foreignKey: 'book_id' });
Student2.hasMany(IssuedBook, { foreignKey: 'student_id' });


module.exports = IssuedBook;
