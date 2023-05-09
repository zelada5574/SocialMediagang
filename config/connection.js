const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  'socialdb',
  'root',
  'password',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);


module.exports = sequelize;