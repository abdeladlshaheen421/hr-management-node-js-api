import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/Auth";
import { roleTypeEnum, TokenDecodedToken } from "../interfaces/User.interface";

export const authMiddleware = (requiredRole?: roleTypeEnum) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Un authenticated" });
      }
      const token = authHeader.split(" ")[1];
      const user: TokenDecodedToken = <TokenDecodedToken>verifyToken(token);
      if (requiredRole && user?.group !== requiredRole) {
        return res.status(403).json({ message: "You don't have permissions." });
      }
      Object.assign(req, { user });
      next();
    } catch (error) {
      next(error);
    }
  };
};
