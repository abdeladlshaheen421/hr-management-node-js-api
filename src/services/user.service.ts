import {
  CreateUserInterface,
  PaginationCriteriaInterface,
  UpdateUserInterface,
  UserInterface,
  UserResponse,
  UsersResponse,
} from "../interfaces/User.interface";
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

export const createEmployee = async (
  user: CreateUserInterface
): Promise<UserResponse> => {
  return <UserResponse>await User.create({
    ...user,
  });
};

export const updateEmployee = async (
  empId: string,
  userUpdatedData: UpdateUserInterface
): Promise<void> => {
  await User.update(userUpdatedData, {
    where: {
      id: empId,
    },
  });
};

export const findAllUsers = async (
  paginationCriteria: PaginationCriteriaInterface
): Promise<UsersResponse> => {
  const query = {
    limit: parseInt(paginationCriteria.limit),
    offset:
      parseInt(paginationCriteria.page) * parseInt(paginationCriteria.limit),
  };
  return await User.findAndCountAll({
    ...query,
  });
};
