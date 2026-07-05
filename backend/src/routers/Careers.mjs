import { Router } from "express";
import { getJobs, getJobById, applyForJob } from "../controllers/Careers/careers.mjs";

const router = Router();

router.get("/listings", getJobs);
router.get("/listings/:id", getJobById);
router.post("/apply", applyForJob);

export default router;
