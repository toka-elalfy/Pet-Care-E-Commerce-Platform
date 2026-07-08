import mongoose from "mongoose";
import Order from "../../models/order.mjs";
import Cart from "../../models/cart.mjs";
import Subscription from "../../models/subscription.mjs";
import Product from "../../models/product.mjs";
import { validationResult } from "express-validator";

export const createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user.id;
        const { shippingAddress, paymentMethod, items: frontendItems } = req.body;

        let itemsToOrder = [];
        let totalAmount = 0;
        let cartToClear = null;

        if (frontendItems && frontendItems.length > 0) {
            const defaultProduct = await Product.findOne();

            itemsToOrder = frontendItems.map(item => {
                const prodId = item.productId || item.id || item.product;
                const isValidId = mongoose.Types.ObjectId.isValid(prodId);

                return {
                    product: isValidId ? prodId : (defaultProduct ? defaultProduct._id : null),
                    quantity: item.quantity || 1,
                    price: item.price || 0,
                    purchaseType: item.purchaseType || 'one-time',
                    frequency: item.frequency || null
                };
            }).filter(item => item.product !== null);

            totalAmount = itemsToOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        } else {
            const cart = await Cart.findOne({ user: userId });
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ msg: "Your cart is empty" });
            }
            itemsToOrder = cart.items;
            totalAmount = cart.totalPrice;
            cartToClear = cart;
        }

        const newOrder = await Order.create({
            user: userId,
            items: itemsToOrder,
            shippingAddress,
            paymentMethod,
            totalAmount
        });

        // Create Subscriptions for items marked as 'subscription'
        const subscriptionItems = (cartToClear ? cartToClear.items : itemsToOrder).filter(item => item.purchaseType === 'subscription');
        for (const item of subscriptionItems) {
            // Helper function to calculate next delivery date based on frequency string
            let nextDeliveryDate = new Date();
            nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 14); // default 2 weeks

            if (item.frequency && item.frequency.toLowerCase().includes("week")) {
                const weeks = parseInt(item.frequency.match(/\d+/)?.[0] || 2);
                nextDeliveryDate = new Date();
                nextDeliveryDate.setDate(nextDeliveryDate.getDate() + (weeks * 7));
            } else if (item.frequency && item.frequency.toLowerCase().includes("month")) {
                const months = parseInt(item.frequency.match(/\d+/)?.[0] || 1);
                nextDeliveryDate = new Date();
                nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + months);
            }

            await Subscription.create({
                user: userId,
                product: item.product,
                quantity: item.quantity,
                frequency: item.frequency || "Every 2 weeks",
                price: item.price,
                nextDeliveryDate,
                originalOrderId: newOrder._id
            });
        }

        // Empty the cart if we used the backend cart
        if (cartToClear) {
            cartToClear.items = [];
            cartToClear.totalPrice = 0;
            cartToClear.subTotal = 0;
            cartToClear.discount = 0;
            await cartToClear.save();
        }

        return res.status(201).json({ msg: "Order placed successfully", order: newOrder });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
