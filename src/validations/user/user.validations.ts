import { body } from "express-validator";

// ex
export const validateLoginData = [
  body("email").isEmail().withMessage("please enter a valid Email Address"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage("please enter a valid Password"),
];
