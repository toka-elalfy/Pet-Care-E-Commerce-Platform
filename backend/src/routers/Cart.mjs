import { Router } from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { checkSchema } from "express-validator";
import { addToCartSchema } from "../utils/validationSchemas/cart.mjs";
import { getCart } from "../controllers/Cart/getCart.mjs";
import { addToCart } from "../controllers/Cart/addToCart.mjs";
import { addMultipleToCart } from "../controllers/Cart/addMultipleToCart.mjs";
import { removeFromCart } from "../controllers/Cart/removeFromCart.mjs";
import { clearCart } from "../controllers/Cart/clearCart.mjs";

const cartRouter = Router();

cartRouter.post("/add-multiple", protect, addMultipleToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
 */
cartRouter.get("/", protect, getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product added successfully
 */
cartRouter.post("/add", protect, checkSchema(addToCartSchema), addToCart);

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed successfully
 */
cartRouter.delete("/remove/:productId", protect, removeFromCart);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
cartRouter.delete("/clear", protect, clearCart);

export default cartRouter;
