export interface LoginRequestBodyInterface {
  email: string;
  password?: Date;
}
export enum roleTypeEnum {
  HR = "HR",
  NORMAL = "NORMAL",
}
export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  group: roleTypeEnum;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface LoginUserReponseInterface {
  id: string;
  email: string;
  name: string;
  group: roleTypeEnum;
}

export interface TokenDecodedToken {
  id: string;
  group: roleTypeEnum;
}

export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
  group: roleTypeEnum;
}

export interface UpdateUserInterface {
  name?: string;
  email?: string;
  password?: string;
  group?: roleTypeEnum;
}

export interface UserResponse {
  id?: string;
  name?: string;
  email?: string;
  group?: roleTypeEnum;
  createdAt?: string;
}
export interface UsersResponse {
  rows: UserResponse[];
  count: number;
}

export interface PaginationCriteriaInterface {
  limit: string;
  page: string;
}
