import Product from "../../models/product.mjs";

export const addProduct = async (req, res) => {
    try {
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        if (!req.files.thumbnail || !req.files.thumbnail[0]) {
            return res.status(400).json({ message: "Thumbnail is required" });
        }

        const thumbnail = {
            url: req.files.thumbnail[0].path,
            public_id: req.files.thumbnail[0].filename
        };

        const images = req.files.images ? req.files.images.map(file => ({
            url: file.path,
            public_id: file.filename
        })) : [];

        const productData = {
            ...req.body,
            thumbnail,
            images
        };

        const product = await Product.create(productData);

        res.status(201).json({
            "msg" :  "Successsfully added new product",
            data: product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}