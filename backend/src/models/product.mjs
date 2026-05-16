import mongoose, { Schema } from "mongoose";

const weightSchema = new mongoose.Schema({
    value: { type: Number },
    unit: { type: String, enum: ["g", "kg", "lbs"], default: "kg" }
}, { _id: false });

const nutritionalInfoSchema = new Schema(
    {
        protein: { type: String },
        fat: { type: String },
        fiber: { type: String },
        moisture: { type: String },
        calories: { type: String },
    },
    { _id: false }
);

const dimensionsSchema = new mongoose.Schema({
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    unit: {
        type: String,
        enum: ["cm", "inch"],
        default: "cm"
    }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true })

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true } // مهم جداً عشان الحذف والتعديل
}, { _id: false });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Product description is required"]
    },
    shortDescription: {
        type: String,
        trim: true,
        required: [true, "Product short description is required"],
        maxlength: 200
    },
    images: {
        type: [imageSchema],
        required: [true, "At least one image is required"],
        validate: {
            validator: (images) => images.length > 0,
            message: "At least one image is required"
        }
    },
    thumbnail: {
        type: imageSchema,
        required: [true, "Product thumbnail image is required"]
    },
    brand: {
        type: String,
        default: null,
        trim: true
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,

    },
    // filters
    petType: {
        type: String,
        required: [true, "Pet type is required"],
        enum: ["all", "dog", "cat", "bird", "rabbit"]
    },
    category: {
        type: String,
        required: true,
        enum: ["all", "food", "toys", "health", "grooming"]
    },

    ageGroup: {
        type: String,
        required: [true, "Age Group is required"],
        enum: ["all", "puppy", "adult", "senior"]
    },
    size: {
        type: String,
        required: [true, "Size is required"],
        enum: ["small", "medium", "large"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price can't be negative"]
    },
    discountPrice: {
        type: Number,
        default: null,
        validate: {
            validator: function (v) {
                return v === null || v < this.price;
            },
            message: "Discount price must be less than the original price"
        }
    },
    sku: {
        type: String,
        uppercase: true,
        required: [true, "sku is required"],
        unique: true,
    },
    stock: {
        type: Number,
        min: [0, "Stock can't be negative"],
        required: true,
        default: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    weight: weightSchema,
    ingredients: {
        type: [String],
        default: []
    },
    nutritionalInfo: nutritionalInfoSchema,
    flavorVariant: {
        type: String,
        enum: ["chicken", "beef", "fish", "lamb", "other", "mixed", null],
        default: null
    },
    isGrainFree: {
        type: Boolean,
        default: false
    },
    isVetRecommended: {
        type: Boolean,
        default: false
    },
    // Accessories and toys
    material: {
        type: [String],
        default: []
    },
    colors: {
        type: [String],
        default: []
    },
    dimensions: dimensionsSchema,
    reviews: {
        type: [reviewSchema],
        default: []
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.virtual("discountPrecent").get(function () {
    if (this.discountPrice && this.price) {
        return Math.round(((this.price - this.discountPrice) / this.price) / 100);
    }
    return 0;
})

// productSchema.index({slug : 1});
productSchema.index({ category: 1 });
productSchema.index({ ageGroup: 1 });
productSchema.index({ size: 1 });
productSchema.index({ petType: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: -1 });
productSchema.index({ petType: 1, category: 1, ageGroup: 1, size: 1 });


productSchema.pre("save", function () {
    this.inStock = this.stock > 0;

})


productSchema.pre('validate', function () {
    if (this.title && (this.isModified('title') || !this.slug)) {
        this.slug = this.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    }

    if (!this.sku) {
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        const petPrefix = this.petType ? this.petType.toUpperCase().substring(0, 3) : 'GEN';
        const catPrefix = this.category ? this.category.toUpperCase().substring(0, 3) : 'PRD';

        this.sku = `${petPrefix}-${catPrefix}-${randomStr}-${Date.now().toString().slice(-4)}`;
    }


});
productSchema.methods.updateRatingStats = function () {
    const reviews = this.reviews;
    this.reviewsCount = reviews.length;
    this.rating = reviews.length > 0 ? +(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
}

export default mongoose.model("Product", productSchema);