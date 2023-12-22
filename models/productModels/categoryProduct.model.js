import DataTypes from 'sequelize';
import { db } from '../../database/config.js';

const CategoryProduct = db.define('categoryProduct', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sectionProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { CategoryProduct };
