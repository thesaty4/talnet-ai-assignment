
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.config');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  realm: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'organizations',
  timestamps: true,
});

module.exports = Organization;