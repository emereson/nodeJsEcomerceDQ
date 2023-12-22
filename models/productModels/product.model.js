import DataTypes from 'sequelize';
import { db } from '../../database/config.js';

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
  purchasedProduct: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  productImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { Product };
