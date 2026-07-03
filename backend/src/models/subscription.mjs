import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    frequency: {
        type: String,
        required: true // e.g., "Every 2 weeks", "Every 4 weeks"
    },
    status: {
        type: String,
        enum: ["active", "paused", "cancelled"],
        default: "active"
    },
    nextDeliveryDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalOrderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }
}, {
    timestamps: true
});

export default mongoose.model("Subscription", subscriptionSchema);
