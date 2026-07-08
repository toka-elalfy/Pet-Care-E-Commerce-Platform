import mongoose from "mongoose";
import slugify from "slugify";
const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true }
}, { _id: false });


const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name must be less than 50 characters"],
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true
        },
        img: {
            type: imageSchema,
            required: [true, "Category image is required"],
        }
    }, {
    timestamps: true
})

categoriesSchema.pre("save", function () {
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
   
});

export default mongoose.model("Category", categoriesSchema)