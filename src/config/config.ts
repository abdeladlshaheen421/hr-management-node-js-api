import { Dialect } from "sequelize";

const {
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;

const databaseConfig: Object = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT as Dialect,
  },
};
export default databaseConfig;
