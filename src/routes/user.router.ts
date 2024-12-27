import { Application } from "express";
import { validateMiddleware } from "../middlewares/general.middleware";
import {
  validateCreateUserData,
  validateLoginData,
  validateUpdateUserData,
} from "../validations/user/user.validations";
import { create, findAll, login, update } from "../controllers/user.controller";
import { authMiddleware } from "..//middlewares/auth.middleware";
import { roleTypeEnum } from "../interfaces/User.interface";

const UserRouter = (app: Application) => {
  app.post("/auth/login", validateLoginData, validateMiddleware, login);
  app.get("/users", authMiddleware(roleTypeEnum.HR), findAll);
  app.post(
    "/users/",
    authMiddleware(roleTypeEnum.HR),
    validateCreateUserData,
    validateMiddleware,
    create
  );
  app.patch(
    "/users/:id",
    authMiddleware(roleTypeEnum.HR),
    validateUpdateUserData,
    validateMiddleware,
    update
  );
};

export default UserRouter;
