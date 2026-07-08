import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { _id: false });

const infoPageSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    lastUpdated: { type: String, default: "March 14, 2026" },
    sections: [sectionSchema]
}, { timestamps: true });

export default mongoose.model("InfoPage", infoPageSchema);
