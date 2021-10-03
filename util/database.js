const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'root', {dialect: 'mysql'});

module.exports = sequelize;