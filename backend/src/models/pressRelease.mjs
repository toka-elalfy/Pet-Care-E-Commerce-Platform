import mongoose from "mongoose";

const pressReleaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, default: "#" },
    image: { type: String },
    source: { type: String }
}, { timestamps: true });

export default mongoose.model("PressRelease", pressReleaseSchema);
