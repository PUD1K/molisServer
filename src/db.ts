import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'default2',
  process.env.DB_USER || 'default1',
  process.env.DB_PASSWORD || '0',
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '0'),
  },
);
