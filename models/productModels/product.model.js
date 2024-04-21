import DataTypes from 'sequelize';
import { db } from '../../config/database.config.js';

const Product = db.define('product', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  categoryProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  labelColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchasedProduct: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  productImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  viewText: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'active',
    values: ['active', 'disable'],
  },
});

export { Product };
