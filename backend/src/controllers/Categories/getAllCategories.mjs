import categoriesModel from "../../models/categories.mjs"

export const getAllCategories = async (req,res) => {
    try {
        const categories = await categoriesModel.find();
        if(categories.length === 0) {
            return res.status(404).json({"msg" : "There are no categories"});
        }
        return res.status(200).send(categories);
    }catch(error) {
        return res.status(501).json({"msg" : "Internal Server Error"})
    }
}