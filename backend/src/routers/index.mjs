import { Router } from "express";
import authRouter from "./Auth.mjs";

const router = Router();
router.use(authRouter);

export default router;

