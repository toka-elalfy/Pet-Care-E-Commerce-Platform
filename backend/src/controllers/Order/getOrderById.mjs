import Order from "../../models/order.mjs";

export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const order = await Order.findById(id).populate("items.product", "title images thumbnail price");
        
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        if (order.user.toString() !== userId) {
            return res.status(403).json({ msg: "Not authorized to view this order" });
        }

        return res.status(200).json({ order });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
