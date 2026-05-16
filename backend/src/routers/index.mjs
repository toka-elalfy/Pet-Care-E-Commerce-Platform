import { Router } from "express";
import AuthRouter from "./Auth.mjs";
import petsRouter from "./Pet.mjs";
import categoriesRouter from "./Categories.mjs";
import productsRouter from "./Products.mjs";


const router = Router();

router.use("/api/auth",AuthRouter);
router.use("/api/pets",petsRouter);
router.use("/api/categories",categoriesRouter);
router.use("/api/products",productsRouter);


export default router;

