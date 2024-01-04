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
      'https://scontent.fjul2-1.fna.fbcdn.net/v/t39.30808-6/305799816_456493173195615_6583435227315987968_n.png?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lLqqh1J-JKQAX-uHKPK&_nc_ht=scontent.fjul2-1.fna&oh=00_AfB37s6e4wOXYejZJnh0BdopZUzTvckKGtb6qu6XtxC1rw&oe=659C6765',
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
