const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mobile: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(95),
        allowNull: false
    }
});

module.exports = User;
