import { NextFunction, Request, Response } from "express";
import {
  CreateUserInterface,
  roleTypeEnum,
  TokenDecodedToken,
  UpdateUserInterface,
  UserInterface,
} from "../interfaces/User.interface";
import {
  createEmployee,
  findAllUsers,
  findUserByEmail,
  updateEmployee,
} from "../services/user.service";
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

    if (user.group !== roleTypeEnum.HR)
      throw createError("Not Authorized", 403);
    //get user from data base
    const token = generateToken({
      id: user.id,
      group: user.group,
    } as TokenDecodedToken);
    res.cookie("token", token, {
      secure: process.env.ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      token: token,
      group: user.group,
    });
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(201).json({
      user: await createEmployee(<CreateUserInterface>req.body),
    });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await updateEmployee(id, <UpdateUserInterface>req.body);
    res.status(200).json({
      message: "Employee Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.status(200).json({
      ...(await findAllUsers(<any>req.query)),
    });
  } catch (error) {
    next(error);
  }
}
