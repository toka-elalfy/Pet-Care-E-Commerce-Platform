import Subscription from "../../models/subscription.mjs";
import Order from "../../models/order.mjs";

export const getReminders = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        // 1. Upcoming deliveries: Active subscriptions delivering within 7 days
        const upcomingDeliveries = await Subscription.find({
            user: userId,
            status: "active",
            nextDeliveryDate: { $lte: nextWeek }
        }).populate("product");

        // 2. Running low: Products bought as "one-time" more than 30 days ago, not currently subscribed
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        const oldOrders = await Order.find({
            user: userId,
            createdAt: { $lte: thirtyDaysAgo }
        }).populate("items.product");

        const runningLowMap = new Map();
        
        // Find one-time items from old orders
        oldOrders.forEach(order => {
            order.items.forEach(item => {
                if (item.purchaseType === 'one-time' && item.product) {
                    runningLowMap.set(item.product._id.toString(), item.product);
                }
            });
        });

        // Filter out those that are now in active subscriptions
        const activeSubs = await Subscription.find({ user: userId, status: "active" });
        activeSubs.forEach(sub => {
            runningLowMap.delete(sub.product.toString());
        });

        const runningLow = Array.from(runningLowMap.values());

        return res.status(200).json({
            reminders: {
                upcomingDeliveries,
                runningLow,
                suggestions: [] // Can be filled with random popular products or AI recommendations later
            }
        });

    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
