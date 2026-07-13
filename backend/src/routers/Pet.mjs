import { Router } from "express"
import { protect } from "../middleware/authMiddleware.mjs";
import { AddPet } from "../controllers/Pet/AddPet.mjs";
import { checkSchema } from "express-validator";
import { petValidationSchema } from "../utils/validationSchemas/pet.mjs";
import { getAllPets } from "../controllers/Pet/getAllPets.mjs";
import { updatePet } from "../controllers/Pet/updatePet.mjs";
import { deletePet } from "../controllers/Pet/deletePet.mjs";
import { getPetRecommendations } from "../controllers/Pet/Recommendations.mjs";
import multer from 'multer';
import storage from '../config/cloudinary.mjs';

const petsRouter = Router();
const upload = multer({ storage });
petsRouter.use(protect);

petsRouter.post("/", upload.single('photo'), checkSchema(petValidationSchema), AddPet);

petsRouter.get("/", getAllPets);

petsRouter.patch("/:id", upload.single('photo'), checkSchema(petValidationSchema), updatePet);

petsRouter.delete("/:id", deletePet);

petsRouter.get("/recommendations/:petId", getPetRecommendations);
export default petsRouter;