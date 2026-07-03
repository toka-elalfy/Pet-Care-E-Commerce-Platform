import Cart from "../../models/cart.mjs";

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId }).populate("items.product", "title price images thumbnail slug discountPrice");
        
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
        }
        
        return res.status(200).json({ cart });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
