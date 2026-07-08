import Category from "../../models/categories.mjs"

export const categoryValidationSchema = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Category name is required"
        },
        isString: {
            errorMessage: "Category name must be string"
        },
        custom: {
            options : async (value) => {
            const existed = await Category.findOne({ name: value });
            if (existed) {
                throw new Error("category must be unique");
            }
            return true;
        }
        }
    }
}