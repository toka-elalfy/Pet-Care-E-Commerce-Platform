import { validationResult } from "express-validator"
import Category from "../../models/categories.mjs";
import cloudinary from "cloudinary";
export const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        const {name  } = req.body;
        if (!req.file) {
            return res.status(400).json({ msg: "Category image is required" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "categories",
        });

        const imageData = {
            url: result.secure_url,
            public_id: result.public_id
        };

        const newCategory = await Category.create({name , img : imageData});
        return res.status(201).json({msg : "Successfully added category" , newCategory});
    } catch (error) {
        console.error(error);
        return res.status(500).json({msg : error.message});
    }
}