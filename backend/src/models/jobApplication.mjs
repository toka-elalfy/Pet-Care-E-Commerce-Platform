import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    coverLetter: { type: String, required: true },
    resume: { type: String }
}, { timestamps: true });

export default mongoose.model("JobApplication", jobApplicationSchema);
