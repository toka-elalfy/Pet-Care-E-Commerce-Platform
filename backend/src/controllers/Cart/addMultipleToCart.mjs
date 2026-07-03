import Cart from "../../models/cart.mjs";
import Product from "../../models/product.mjs";

export const addMultipleToCart = async (req, res) => {
    try {
        const { items } = req.body; // array of { productId, quantity, purchaseType, frequency }
        const userId = req.user.id;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ msg: "Items array is required" });
        }

        let userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            userCart = new Cart({ user: userId, items: [] });
        }

        for (const item of items) {
            const { productId, quantity, purchaseType, frequency } = item;
            
            const productExists = await Product.findById(productId);
            if (!productExists) continue; // Skip invalid products

            const price = productExists.discountPrice ? productExists.discountPrice : productExists.price;

            const itemIndex = userCart.items.findIndex(
                p => p.product.toString() === productId && 
                p.purchaseType === (purchaseType || "one-time") && 
                p.frequency === (frequency || null)
            );

            if (itemIndex > -1) {
                userCart.items[itemIndex].quantity += quantity || 1;
            } else {
                userCart.items.push({ 
                    product: productId, 
                    quantity: quantity || 1, 
                    price,
                    purchaseType: purchaseType || "one-time",
                    frequency: frequency || null
                });
            }
        }

        await userCart.save();
        await userCart.populate("items.product", "title price images thumbnail slug discountPrice");

        return res.status(200).json({ msg: "Products added to cart", cart: userCart });

    } catch (err) {
        console.error("ADD MULTIPLE TO CART ERROR:", err);
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
