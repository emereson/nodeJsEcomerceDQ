import DataTypes from 'sequelize';
import { db } from '../config/database.config.js';

const OpeningHours = db.define('openingHours', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { OpeningHours };
