import Cart from "../../models/cart.mjs";
import Product from "../../models/product.mjs";
import { validationResult } from "express-validator";

export const addToCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { productId, quantity, purchaseType, frequency } = req.body;
        const userId = req.user.id;

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const price = productExists.discountPrice ? productExists.discountPrice : productExists.price;

        let userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            userCart = new Cart({
                user: userId,
                items: [{ 
                    product: productId, 
                    quantity: quantity || 1, 
                    price,
                    purchaseType: purchaseType || "one-time",
                    frequency: frequency || null
                }]
            });
        } else {
            const itemIndex = userCart.items.findIndex(p => p.product.toString() === productId && p.purchaseType === (purchaseType || "one-time") && p.frequency === (frequency || null));

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

        return res.status(200).json({ msg: "Product added to cart", cart: userCart });

    } catch (err) {
        console.error("ADD TO CART ERROR:", err);
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
