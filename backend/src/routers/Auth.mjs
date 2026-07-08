import { Router } from "express";
import { handleLogin } from "../controllers/Auth/login.mjs";
import { handleRegister } from "../controllers/Auth/register.mjs";
import { checkSchema } from "express-validator";
import { loginSchema, registerSchema } from "../utils/validationSchemas/user.mjs";
import { handleRefresh } from "../controllers/Auth/handleRefresh.mjs";
import { handleLogout } from "../controllers/Auth/logout.mjs";
import { handleForgotPassword } from "../controllers/Auth/forgotPassword.mjs";
import { handleResetPassword } from "../controllers/Auth/resetPassword.mjs";

const AuthRouter = Router();


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns access token and sets refresh token in cookie
 *       401:
 *         description: Invalid credentials
 */
AuthRouter.post("/login", checkSchema(loginSchema), handleLogin);


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fname
 *               - lname
 *               - email
 *               - password
 *             properties:
 *               fname:
 *                 type: string
 *               lname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email or Username already exists
 */

AuthRouter.post("/register", checkSchema(registerSchema), handleRegister);

/**
 * @swagger
 * /api/auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Uses the refresh token from cookies to generate a new access token.
 *     responses:
 *       200:
 *         description: New access token generated
 *       403:
 *         description: Invalid or expired refresh token
 */
AuthRouter.post("/refresh", handleRefresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Clears the refresh token from database and cookies.
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
AuthRouter.post("/logout", handleLogout);
AuthRouter.post("/forgot-password", handleForgotPassword);
AuthRouter.post("/reset-password", handleResetPassword);
export default AuthRouter;