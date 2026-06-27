export const addToCartSchema = {
    productId: {
        in: ["body"],
        notEmpty: { errorMessage: "Product ID is required" },
        isMongoId: { errorMessage: "Invalid Product ID format" }
    },
    quantity: {
        in: ["body"],
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "Quantity must be an integer greater than 0"
        }
    }
};
