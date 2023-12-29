import DataTypes from 'sequelize';
import { db } from '../../config/database.config.js';

const SectionProduct = db.define('sectionProduct', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectionIcon: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sectionProductImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { SectionProduct };
