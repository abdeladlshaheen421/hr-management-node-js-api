import { NextFunction, Request, Response } from "express";
import {
  LoginUserReponseInterface,
  TokenDecodedToken,
  UserInterface,
} from "../interfaces/User.interface";
import { findUserByEmail } from "../services/user.service";
import { comparePasswords, createError, generateToken } from "../utils/Auth";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    const user: UserInterface | null = <UserInterface>(
      await findUserByEmail(email)
    );

    if (!user || !(await comparePasswords(password, <string>user.password)))
      throw createError("Invalid credentials", 401);
    //get user from data base
    const token = generateToken(<TokenDecodedToken>user);
    res.cookie("token", token, {
      secure: process.env.ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "login Successfully",
      user: <LoginUserReponseInterface>user,
    });
  } catch (error) {
    next(error);
  }
}

export async function createEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function updateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {}
