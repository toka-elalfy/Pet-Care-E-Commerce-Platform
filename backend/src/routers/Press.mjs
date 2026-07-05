import { Router } from "express";
import { getPressReleases } from "../controllers/Press/press.mjs";

const router = Router();

router.get("/releases", getPressReleases);

export default router;
