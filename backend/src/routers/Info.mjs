import { Router } from "express";
import { getInfoPage } from "../controllers/Info/info.mjs";

const router = Router();

router.get("/:slug", getInfoPage);

export default router;
