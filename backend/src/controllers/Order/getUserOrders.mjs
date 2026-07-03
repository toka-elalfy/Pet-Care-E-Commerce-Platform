import Order from "../../models/order.mjs";

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate("items.product", "title images thumbnail price");
        
        return res.status(200).json({ orders });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
