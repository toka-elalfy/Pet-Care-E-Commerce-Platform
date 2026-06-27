import { Router } from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { getReminders } from "../controllers/Reminders/reminders.mjs";

const reminderRouter = Router();

reminderRouter.use(protect);

reminderRouter.get("/", getReminders);

export default reminderRouter;
