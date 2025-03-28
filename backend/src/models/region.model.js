const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.config');
const Organization = require('./organization.model');

const RegionalOffice = sequelize.define('RegionalOffice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Organization,
      key: 'id',
    },
  },
  keycloakGroupId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'regional_offices',
  timestamps: true,
});

RegionalOffice.belongsTo(Organization, { foreignKey: 'organizationId' });
Organization.hasMany(RegionalOffice, { foreignKey: 'organizationId' });

module.exports = RegionalOffice;