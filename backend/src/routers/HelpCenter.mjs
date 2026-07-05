import { Router } from "express";
import { getFAQs } from "../controllers/HelpCenter/faqs.mjs";

const router = Router();

router.get("/faqs", getFAQs);

export default router;
