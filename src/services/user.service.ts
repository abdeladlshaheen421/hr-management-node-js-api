import { UserInterface } from "../interfaces/User.interface";
import User from "../models/User";

export const findUserByEmail = async (
  email: string
): Promise<UserInterface | null> => {
  return <UserInterface | null>await User.findOne({
    where: {
      email,
    },
  });
};

export const createEmployee = async () => {};

export const updateEmployee = async () => {};
