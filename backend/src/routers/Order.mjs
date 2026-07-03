import { Router } from "express";
import { protect } from "../middleware/authMiddleware.mjs";
import { checkSchema } from "express-validator";
import { createOrderSchema } from "../utils/validationSchemas/order.mjs";
import { createOrder } from "../controllers/Order/createOrder.mjs";
import { getUserOrders } from "../controllers/Order/getUserOrders.mjs";
import { getOrderById } from "../controllers/Order/getOrderById.mjs";
import { updateOrderStatus } from "../controllers/Order/updateOrderStatus.mjs";

const orderRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order from cart
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
orderRouter.post("/", protect, checkSchema(createOrderSchema), createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's orders
 */
orderRouter.get("/", protect, getUserOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
orderRouter.get("/:id", protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin/System)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated
 */
orderRouter.patch("/:id/status", protect, updateOrderStatus);

export default orderRouter;
