import Category from "../../models/categories.mjs";
import cloudinary from "cloudinary";
export const updateCategory = async (req, res) => {
    try {
        const {slug} = req.params;
        const existed = await Category.findOne({slug});
        if(!existed) {
            return res.status(404).json({msg : "Category not found"});
        }
        const updateData = {...req.body};
        if (req.file) {
            if (existed.img && existed.img.public_id) {
                await cloudinary.uploader.destroy(existed.img.public_id);
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "categories",
            });

            updateData.img = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }
        existed.set(updateData);
        const updatedCategory = await existed.save();
        return res.status(200).json({ msg: "Successfully updated category", updatedCategory });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}