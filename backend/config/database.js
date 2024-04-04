// backend/config/database.js

const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to true to log SQL queries
});

module.exports = sequelize;
