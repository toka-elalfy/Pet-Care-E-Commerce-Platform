import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }

}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};




export default mongoose.model("User",userSchema);