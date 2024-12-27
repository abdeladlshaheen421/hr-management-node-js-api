import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    group: {
      type: DataTypes.ENUM("HR", "NORMAL"),
      allowNull: false,
    },
  },
  { hooks: {}, paranoid: true, timestamps: true, tableName: "users" }
);

export default User;
