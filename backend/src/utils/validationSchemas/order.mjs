export const createOrderSchema = {
    shippingAddress: {
        in: ["body"],
        notEmpty: { errorMessage: "Shipping address is required" },
        isObject: { errorMessage: "Shipping address must be an object" }
    },
    "shippingAddress.street": {
        in: ["body"],
        notEmpty: { errorMessage: "Street is required" },
        isString: { errorMessage: "Street must be a string" }
    },
    "shippingAddress.city": {
        in: ["body"],
        notEmpty: { errorMessage: "City is required" },
        isString: { errorMessage: "City must be a string" }
    },
    "shippingAddress.postalCode": {
        in: ["body"],
        notEmpty: { errorMessage: "Postal code is required" },
        isString: { errorMessage: "Postal code must be a string" }
    },
    "shippingAddress.country": {
        in: ["body"],
        notEmpty: { errorMessage: "Country is required" },
        isString: { errorMessage: "Country must be a string" }
    },
    paymentMethod: {
        in: ["body"],
        notEmpty: { errorMessage: "Payment method is required" },
        isIn: {
            options: [["credit_card", "paypal", "cash_on_delivery"]],
            errorMessage: "Invalid payment method (credit_card, paypal, cash_on_delivery)"
        }
    }
};
