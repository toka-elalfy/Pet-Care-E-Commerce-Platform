import mongoose from "mongoose";
const petSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["Dog", "Cat", "Bird", "Rabbit"],
        },
        breed: {
            type: String,
            default: "Mixed",
        },
        age: {
            type: Number,
            default : 0
        },
        weight: {
            type: Number, 
        },
        photo: {
            type: String, 
            default: null,
        },
        size: {
            type : String,
            required : true,
            enum : ["Small","Medium","Large"]
        },
        needs : {
            type : [String],
            required : true,
            enum : ["Grain-free","Joint support","Sensitive skin","Puppy growth","Weight management","Dental care"]
        }
    },
    { timestamps: true }
);

petSchema.index({ owner: 1, name: 1 }, { unique: true });

export default mongoose.model("Pet",petSchema);