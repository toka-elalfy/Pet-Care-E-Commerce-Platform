import { Router } from "express";
import { getAllCategories } from "../controllers/Categories/getAllCategories.mjs";
import { addCategory } from "../controllers/Categories/addCategory.mjs";
import { categoryValidationSchema } from "../utils/validationSchemas/category.mjs";
import { checkSchema } from "express-validator";
import storage from "../config/cloudinary.mjs";
import multer from "multer";
import categories from "../models/categories.mjs";
import { updateCategory } from "../controllers/Categories/updateCategory.mjs";
import { deleteCategory } from "../controllers/Categories/deleteCategory.mjs";

const upload = multer({ storage });
const categoriesRouter = Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all product categories
 *     description: Retrieve a list of all available categories in the system.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   img:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *       404:
 *         description: No categories found
 *       500:
 *         description: Internal Server Error
 * 
 *   post:
 *     summary: Create a new category
 *     description: Add a new category with an image file.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - img
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category (must be unique)
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: Category image file to upload
 *     responses:
 *       201:
 *         description: Successfully added category
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal Server Error
 */
categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/", upload.single("img"), checkSchema(categoryValidationSchema), addCategory);

/**
 * @swagger
 * /api/categories/{slug}:
 *   patch:
 *     summary: Update an existing category
 *     description: Update category details (name and/or image) using its slug.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique slug of the category
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the category
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: New category image file to upload
 *     responses:
 *       200:
 *         description: Successfully updated category
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 * 
 *   delete:
 *     summary: Delete a category
 *     description: Remove a category from the system using its slug.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique slug of the category to delete
 *     responses:
 *       200:
 *         description: Successfully deleted category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
categoriesRouter.patch("/:slug", upload.single("img"), checkSchema(categoryValidationSchema), updateCategory);
categoriesRouter.delete("/:slug", deleteCategory);

export default categoriesRouter;