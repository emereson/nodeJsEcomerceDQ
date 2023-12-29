import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../config/database.config.js';

const User = db.define('user', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userImg: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:
      'https://nftcalendar.io/storage/uploads/2022/03/14/chefpizza_03142022215931622fbac32a3ff.jpg',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin'),
    allowNull: true,
    defaultValue: 'admin',
  },
});

export { User };
