import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import { hashPassword } from "../utils/Auth";

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
  {
    hooks: {
      beforeCreate: async (instance: any, options: any) => {
        instance.password = await hashPassword(instance.password);
      },
      beforeUpdate: async (instance: any, options: any) => {
        if (instance.changed("password"))
          instance.password = await hashPassword(instance.password);
      },
    },
    paranoid: true,
    timestamps: true,
    tableName: "users",
  }
);

export default User;
