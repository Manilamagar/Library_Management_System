const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    permissions: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'roles',
});

// Define associations in a separate function
Role.associate = (models) => {
    Role.belongsToMany(models.User, {
        through: 'UserRoles',
        as: 'users',
        foreignKey: 'roleId',
    });
};

module.exports = Role;