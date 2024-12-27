import { Sequelize } from "sequelize";
import databaseConfig from "./config";

const ENV = process.env.ENV ?? "development";
const sequelize = new Sequelize({ ...Object(databaseConfig)[ENV] });

export default sequelize;
