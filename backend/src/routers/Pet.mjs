import {Router} from "express"
import { protect } from "../middleware/authMiddleware.mjs";
import { AddPet } from "../controllers/Pet/AddPet.mjs";
import { checkSchema } from "express-validator";
import { petValidationSchema } from "../utils/validationSchemas/pet.mjs";
import { getAllPets } from "../controllers/Pet/getAllPets.mjs";
import { updatePet } from "../controllers/Pet/updatePet.mjs";
import { deletePet } from "../controllers/Pet/deletePet.mjs";
import { getPetRecommendations } from "../controllers/Pet/Recommendations.mjs";

const petsRouter = Router();
petsRouter.use(protect);
/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Add a new pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name: { type: string }
 *               type: { type: string }
 *               breed: { type: string }
 *               age: { type: number }
 *               weight: { type: number }
 *               photo: { type: string }
 *               size: { type: string }
 *               needs: { type: string }
 *     responses:
 *       201:
 *         description: Pet Added Successfully
 *       400:
 *         description: Validation error or Pet already exists
 */
petsRouter.post("/",checkSchema(petValidationSchema),AddPet);
/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Get all pets for the logged-in user
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pets retrieved successfully
 *       404:
 *         description: There are no available Pets
 */
petsRouter.get("/",getAllPets);
/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Update pet details
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: number }
 *               weight: { type: number }
 *     responses:
 *       200:
 *         description: Pet Updated Successfully
 *       404:
 *         description: Pet Not Found
 */
petsRouter.patch("/:id",checkSchema(petValidationSchema),updatePet);
/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Delete a pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet Deleted Successfully
 *       404:
 *         description: Pet Not Found
 */
petsRouter.delete("/:id" , deletePet);

/**
 * @swagger
 * /api/pets/recommendations/{petId}:
 *   get:
 *     summary: Get recommended products for a specific pet
 *     description: Returns products that match the pet's type, size, age, and special dietary needs.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pet
 *     responses:
 *       200:
 *         description: List of recommended products
 *       404:
 *         description: Pet not found
 */
petsRouter.get("/petRedcommendations/:petId",getPetRecommendations);
export default petsRouter;