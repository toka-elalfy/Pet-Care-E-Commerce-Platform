import Subscription from "../../models/subscription.mjs";

export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user.id }).populate("product");
        return res.status(200).json({ subscriptions });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const updateSubscriptionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // active, paused, cancelled

        if (!["active", "paused", "cancelled"].includes(status)) {
            return res.status(400).json({ msg: "Invalid status" });
        }

        const subscription = await Subscription.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { $set: { status } },
            { new: true }
        ).populate("product");

        if (!subscription) {
            return res.status(404).json({ msg: "Subscription not found" });
        }

        return res.status(200).json({ msg: `Subscription ${status}`, subscription });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const skipNextDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findOne({ _id: id, user: req.user.id });

        if (!subscription) {
            return res.status(404).json({ msg: "Subscription not found" });
        }

        // Calculate new nextDeliveryDate based on frequency
        let nextDeliveryDate = new Date(subscription.nextDeliveryDate);
        if (subscription.frequency.toLowerCase().includes("week")) {
            const weeks = parseInt(subscription.frequency.match(/\d+/)?.[0] || 2);
            nextDeliveryDate.setDate(nextDeliveryDate.getDate() + (weeks * 7));
        } else if (subscription.frequency.toLowerCase().includes("month")) {
            const months = parseInt(subscription.frequency.match(/\d+/)?.[0] || 1);
            nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + months);
        } else {
            nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 14);
        }

        subscription.nextDeliveryDate = nextDeliveryDate;
        await subscription.save();

        return res.status(200).json({ msg: "Next delivery skipped", subscription });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const updateSubscriptionDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, frequency } = req.body;

        const subscription = await Subscription.findOne({ _id: id, user: req.user.id });
        if (!subscription) {
            return res.status(404).json({ msg: "Subscription not found" });
        }

        let updated = false;

        if (quantity && typeof quantity === 'number' && quantity >= 1) {
            subscription.quantity = quantity;
            updated = true;
        }

        if (frequency && typeof frequency === 'string') {
            subscription.frequency = frequency;
            // Recalculate nextDeliveryDate dynamically from today if frequency changes
            let nextDeliveryDate = new Date();
            if (frequency.toLowerCase().includes("week")) {
                const weeks = parseInt(frequency.match(/\d+/)?.[0] || 2);
                nextDeliveryDate.setDate(nextDeliveryDate.getDate() + (weeks * 7));
            } else if (frequency.toLowerCase().includes("month")) {
                const months = parseInt(frequency.match(/\d+/)?.[0] || 1);
                nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + months);
            } else {
                nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 14);
            }
            subscription.nextDeliveryDate = nextDeliveryDate;
            updated = true;
        }

        if (updated) {
            await subscription.save();
        }

        return res.status(200).json({ msg: "Subscription updated", subscription });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
