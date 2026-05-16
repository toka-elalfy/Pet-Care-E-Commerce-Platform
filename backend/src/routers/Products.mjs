import Router from "express";
import { getProducts } from "../controllers/Products/GetProducts.mjs";
import multer from 'multer';
import storage from '../config/cloudinary.mjs';
import { addProduct } from "../controllers/Products/addProduct.mjs";
import { getSingleProduct } from "../controllers/Products/GetSingleProduct.mjs";
const productsRouter = Router();
const upload = multer({ storage });

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with advanced filtering
 *     description: Retrieve products with support for searching, sorting, pagination, and field selection.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search by product title (regex)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (e.g., price, -price, createdAt)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Specific fields to return (comma separated)
 *       - in: query
 *         name: price[gte]
 *         schema:
 *           type: number
 *         description: Filter by price greater than or equal to
 *     responses:
 *       200:
 *         description: A list of products retrieved successfully
 *       500:
 *         description: Server error
 */

productsRouter.get("/",getProducts);
productsRouter.post('/', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), addProduct);
productsRouter.get("/:slug",getSingleProduct);

export default productsRouter;