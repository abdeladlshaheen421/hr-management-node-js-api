import { body } from "express-validator";
import { roleTypeEnum, UserInterface } from "../../interfaces/User.interface";
import { findUserByEmail } from "../../services/user.service";

export const validateLoginData = [
  body("email").isEmail().withMessage("please enter a valid Email Address"),
  body("password").isString().withMessage("please enter a valid Password"),
];

export const validateCreateUserData = [
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("please name is required with 2 charcters at lease"),
  body("email")
    .isEmail()
    .withMessage("please enter a valid Email Address")
    .custom(async (value: string, { req }) => {
      const user: UserInterface | null = await findUserByEmail(value);
      if (user) throw new Error("Email already in use");
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "please enter a valid Password at lease (8 character, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  body("group")
    .isIn([roleTypeEnum.HR, roleTypeEnum.NORMAL])
    .withMessage("please enter valid group (HR or NORMAL)"),
];

export const validateUpdateUserData = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("please name is required with 2 charcters at lease"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("please enter a valid Email Address")
    .custom(async (value: string, { req }) => {
      const user: UserInterface | null = await findUserByEmail(value);
      if (user && req.params && req.params.id !== user.id)
        throw new Error("Email already in use");
    }),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "please enter a valid Password at lease (8 character, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  body("group")
    .optional()
    .isIn([roleTypeEnum.HR, roleTypeEnum.NORMAL])
    .withMessage("please enter valid group (HR or NORMAL)"),
];

const checkEmailExistance = [];
