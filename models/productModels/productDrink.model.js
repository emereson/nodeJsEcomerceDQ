import DataTypes from 'sequelize';
import { db } from '../../config/database.config.js';

const ProductDrink = db.define('productDrink', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { ProductDrink };
