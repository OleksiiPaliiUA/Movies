import { Sequelize } from 'sequelize';

const db: Sequelize = new Sequelize(
  process.env.DB_NAME || 'cinema',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
  },
);

export default db;
