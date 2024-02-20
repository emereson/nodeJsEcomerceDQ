import DataTypes from 'sequelize';
import { db } from '../../config/database.config.js';
const Order = db.define('order', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  clientOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extras: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  pizzas: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  drink: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  numberOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { Order };
