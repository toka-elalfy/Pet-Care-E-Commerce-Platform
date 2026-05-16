import Category from "../../models/categories.mjs";

export const deleteCategory = async (req,res) => {
    try {
        const {slug} = req.params;
        const existed = await Category.findOne({slug});
        if(!existed) return res.status(404).json({msg : "Category not found"});
        const deletedCategory = await Category.deleteOne({slug});
        return res.status(200).json({msg : "Successfully deleted Category" , deletedCategory});
    }catch(error) {
        return res.status(500).json({msg : error.message});
    }
}