import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less than 1"],
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    purchaseType: {
        type: String,
        enum: ["one-time", "subscription"],
        default: "one-time"
    },
    frequency: {
        type: String,
        default: null
    }
}, { _id: false });

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    subTotal: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate total price and bundle discount before saving
cartSchema.pre("save", function() {
    this.subTotal = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
    
    // Bundle discount logic: 
    // 2 items = 5%, 3 items = 10%, 4 items = 15%, 5+ items = 20%
    const totalItemsCount = this.items.reduce((count, item) => count + item.quantity, 0);
    let discountPercent = 0;
    
    if (totalItemsCount >= 5) discountPercent = 0.20;
    else if (totalItemsCount === 4) discountPercent = 0.15;
    else if (totalItemsCount === 3) discountPercent = 0.10;
    else if (totalItemsCount === 2) discountPercent = 0.05;

    this.discount = this.subTotal * discountPercent;
    this.totalPrice = this.subTotal - this.discount;
});

export default mongoose.model("Cart", cartSchema);
