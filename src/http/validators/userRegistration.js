import { body } from "express-validator";
import { db } from "../../config/sql.js";

export const userRegistrationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      if (value) {
        const [existingUser] = await db.query(
          "SELECT * FROM users WHERE email = ?",
          [value]
        );

        if (existingUser.length > 0) {
          throw new Error("Email already exists");
        }
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be at least 8 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
