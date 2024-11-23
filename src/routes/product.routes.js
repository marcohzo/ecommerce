import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Rutas públicas
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);

// Rutas protegidas para administradores
router.post("/", authenticateJWT, authorize("admin"), createProductController);
router.put(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  updateProductController
);
router.delete(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  deleteProductController
);

export default router;
