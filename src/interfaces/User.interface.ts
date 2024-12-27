export interface LoginRequestBodyInterface {
  email: string;
  password?: Date;
}
export enum roleTypeEnum {
  ADMIN = "admin",
}
export interface UserInterface {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role: roleTypeEnum;
}
export interface LoginUserReponseInterface {
  id: string;
  email: string;
  username: string;
  role: roleTypeEnum;
}

export interface TokenDecodedToken {
  id: string;
  role: roleTypeEnum;
}
