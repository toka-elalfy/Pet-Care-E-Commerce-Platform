import { Router } from "express";
import { createContactMessage, getContactMessages } from "../controllers/Contact/contact.mjs";

const router = Router();

router.post("/", createContactMessage);
router.get("/", getContactMessages);

export default router;
