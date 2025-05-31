const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/sqlite');
const Account = require('./account');

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  httpMethod: {
    type: DataTypes.ENUM('GET', 'POST', 'PUT'),
    allowNull: false
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true
});

Account.hasMany(Destination, { onDelete: 'CASCADE' });
Destination.belongsTo(Account);

module.exports = Destination;
