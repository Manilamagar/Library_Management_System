// backend/models/User.js

const bcrypt = require('bcryptjs');
const { default: sequelize } = require('../Config/db');
const { DataTypes } = require('sequelize');
sequelize.sync({ force: true});

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, Null: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Librarian', 'Student'), allowNull: true},
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
},{
  timestamps: false,
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;