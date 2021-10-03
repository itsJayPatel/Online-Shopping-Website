const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(254),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(95),
        allowNull: false
    }
});

module.exports = Admin;