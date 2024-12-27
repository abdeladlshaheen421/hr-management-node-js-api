import { body } from "express-validator";
import { roleTypeEnum } from "../../interfaces/User.interface";

export const validateLoginData = [
  body("email").isEmail().withMessage("please enter a valid Email Address"),
  body("password").isString().withMessage("please enter a valid Password"),
];

export const validateCreateUserData = [
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("please name is required with 2 charcters at lease"),
  body("email").isEmail().withMessage("please enter a valid Email Address"),
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
    .withMessage("please enter a valid Email Address"),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage("please enter a valid Password"),
  body("group")
    .optional()
    .isIn([roleTypeEnum.HR, roleTypeEnum.NORMAL])
    .withMessage("please enter valid group (HR or NORMAL)"),
];
