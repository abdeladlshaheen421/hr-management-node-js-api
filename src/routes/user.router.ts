import { Application } from "express";
import { validateMiddleware } from "../middlewares/general.middleware";
import { validateLoginData } from "../validations/user/user.validations";
import {
  createEmployee,
  login,
  updateEmployee,
} from "../controllers/user.controller";

const UserRouter = (app: Application) => {
  app.post("/auth/login", validateLoginData, validateMiddleware, login);
  app.post("/user/create", createEmployee);
  app.post("/user/update", updateEmployee);
};

export default UserRouter;
