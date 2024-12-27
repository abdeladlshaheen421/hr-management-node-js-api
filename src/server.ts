import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import helmet from "helmet";
import sequelize from "./config/sequelize";
import UserRouter from "./routes/user.router";
import { CustomError } from "./utils/Auth";

const { SERVER_PORT, ENV, FRONTEND_URL } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: (requestOrigin, callback) => {
      if ([FRONTEND_URL].includes(requestOrigin) || !requestOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(SERVER_PORT || 3000, (): void => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        `||=============================================||
       \n||         Server is running on port ${SERVER_PORT}      ||
       \n||=============================================||`
      );
    })
    .catch((error: Error) => console.log("DataBase connection Failed", error));
});

// ===========Routes===========
app.get(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return res.status(200).json({
      message: "welcome to HR management api",
    });
  }
);
// =========== HANDLE Routes ==================

UserRouter(app);

//=============================

// Error handler middleware
app.use(
  (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    if (ENV == "development")
      return res
        .status(error.statusCode ?? 500)
        .json({ message: error.message });
    else {
      return res
        .status(error.statusCode ?? 500)
        .json({ message: "Something Went Wrong" });
    }
  }
);

// notFound endpoint middleware
app.use((req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({ message: "Route Not Found" });
});
