import DataTypes from 'sequelize';
import { db } from '../../config/database.config.js';

const ProductPizza = db.define('productPizza', {
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

export { ProductPizza };
