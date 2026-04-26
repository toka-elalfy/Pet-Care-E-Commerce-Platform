import {Router} from "express"
import { protect } from "../middleware/authMiddleware.mjs";
import { AddPet } from "../controllers/Pet/AddPet.mjs";
import { checkSchema } from "express-validator";
import { petValidationSchema } from "../utils/validationSchemas/pet.mjs";

const router = Router();
router.use(protect);

router.post("/api/pets",checkSchema(petValidationSchema),AddPet);

export default router;