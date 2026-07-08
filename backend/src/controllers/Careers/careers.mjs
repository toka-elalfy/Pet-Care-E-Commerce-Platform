import Job from "../../models/job.mjs";
import JobApplication from "../../models/jobApplication.mjs";

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        return res.status(200).json({ jobs });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }
        return res.status(200).json({ job });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};

export const applyForJob = async (req, res) => {
    try {
        const { jobId, name, email, coverLetter, resume } = req.body;
        if (!jobId || !name || !email || !coverLetter) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: "Job listing not found" });
        }

        const application = new JobApplication({ jobId, name, email, coverLetter, resume });
        await application.save();

        return res.status(201).json({ msg: "Application submitted successfully", application });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error", err: err.message });
    }
};
