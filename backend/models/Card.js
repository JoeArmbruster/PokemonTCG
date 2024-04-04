// backend/models/Card.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  set: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Card;
