import { Router } from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { getSubscriptions, updateSubscriptionStatus, skipNextDelivery } from "../controllers/Subscription/subscriptions.mjs";

const subscriptionRouter = Router();

subscriptionRouter.use(protect);

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.put("/:id/status", updateSubscriptionStatus);
subscriptionRouter.put("/:id/skip", skipNextDelivery);

export default subscriptionRouter;
