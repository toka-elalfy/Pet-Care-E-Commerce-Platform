import { Router } from "express";
import authRouter from "./Auth.mjs";
import petRouter from "./Pet.mjs";

const router = Router();
router.use(authRouter);
router.use(petRouter);



export default router;

