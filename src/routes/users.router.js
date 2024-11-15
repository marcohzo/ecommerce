import { Router } from "express";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authenticateJWT, getCurrentUser);

export default router;
