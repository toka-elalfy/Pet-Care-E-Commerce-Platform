import { Router } from "express";
import AuthRouter from "./Auth.mjs";
import petsRouter from "./Pet.mjs";
import categoriesRouter from "./Categories.mjs";
import productsRouter from "./Products.mjs";
import cartRouter from "./Cart.mjs";
import orderRouter from "./Order.mjs";
import UserRouter from "./User.mjs";
import subscriptionRouter from "./Subscription.mjs";
import reminderRouter from "./Reminder.mjs";
import contactRouter from "./Contact.mjs";
import careersRouter from "./Careers.mjs";
import faqRouter from "./HelpCenter.mjs";
import pressRouter from "./Press.mjs";
import infoRouter from "./Info.mjs";

const router = Router();

router.use("/api/auth", AuthRouter);
router.use("/api/pets", petsRouter);
router.use("/api/categories", categoriesRouter);
router.use("/api/products", productsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/orders", orderRouter);
router.use("/api/user", UserRouter);
router.use("/api/subscriptions", subscriptionRouter);
router.use("/api/reminders", reminderRouter);
router.use("/api/contact", contactRouter);
router.use("/api/careers", careersRouter);
router.use("/api/help-center", faqRouter);
router.use("/api/press", pressRouter);
router.use("/api/info", infoRouter);

export default router;

