import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TokenDecodedToken } from "src/interfaces/User.interface";
const { SALT_ROUNDS, JWT_SECRET, PASSWORD_PEPPER } = process.env;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password + PASSWORD_PEPPER, Number(SALT_ROUNDS));
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: TokenDecodedToken) => {
  return jwt.sign(user, <string>JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, <string>JWT_SECRET);
  } catch (error) {
    throw createError("invalid Token or expired", 401);
  }
};

export const createError = (message: string, statusCode: number) => {
  const error = new Error(message);
  Object.assign(error, { statusCode });
  return error;
};
