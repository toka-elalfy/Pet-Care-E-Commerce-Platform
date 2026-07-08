import Product from "../../models/product.mjs";
import mongoose from "mongoose";

export const getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        let targetProduct;

        if (mongoose.isValidObjectId(slug)) {
            targetProduct = await Product.findById(slug);
        } else {
            targetProduct = await Product.findOne({ slug });
        }

        if (!targetProduct) {
            return res.status(404).json({ msg: "product not found" });
        }
        return res.status(200).json({ status: "success", data: targetProduct });
    } catch (error) {
        return res.status(500).send({ status: "error", error: error.message });
    }
}