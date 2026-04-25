import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.mjs";

const router = Router();

router.post("/auth/login",handleLogin);
router.post("/auth/register",handleRegister);

export default router;