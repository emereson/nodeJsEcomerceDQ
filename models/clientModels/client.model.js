import { db } from '../../database/config.js';
import { Sequelize, DataTypes } from 'sequelize';

const Client = db.define('client', {
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
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientImg: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue:
      'https://i.seadn.io/gae/wVcjyNPoWwuVlQ5eH8acOVp58okFD1fEG5AgMLQD2TVmfZ30lpnwwNn5Db9HggFKBWCKw8ldCwiWIWEGToiXe_0ssEN3iniO5WoO?auto=format&dpr=1&w=1920',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

export { Client };
