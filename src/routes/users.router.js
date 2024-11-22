import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";

const createUsersRouter = async () => {
  await initializeUsers();
  const router = Router();

  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.get("/current", authenticateJWT, getCurrentUser);

  return router;
};

export default createUsersRouter;
