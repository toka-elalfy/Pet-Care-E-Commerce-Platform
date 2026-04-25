import { Router } from "express";
import { handleLogin } from "../controllers/Auth/login.mjs";
import { handleRegister } from "../controllers/Auth/register.mjs";
import { checkSchema } from "express-validator";
import { loginSchema, registerSchema } from "../utils/validationSchemas/user.mjs";

const router = Router();

router.post("/auth/login", checkSchema(loginSchema), handleLogin);
router.post("/auth/register", checkSchema(registerSchema), handleRegister);
export default router;