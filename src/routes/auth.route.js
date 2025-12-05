import { Router } from "express";
import { userRegistrationValidator } from "../http/validators/userRegistration.js";
import { validate } from "../http/middleware/validateMiddleware.js";
import { AuthController } from "../http/controllers/AuthController.js";
import { userLoginValidation } from "../http/validators/userLogin.js";

const router = Router();

router.post(
  "/signup",
  userRegistrationValidator,
  validate,
  AuthController.register
);

router.post("/login", userLoginValidation, validate, AuthController.login);

export default router;
