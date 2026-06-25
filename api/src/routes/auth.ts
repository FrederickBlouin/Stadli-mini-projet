import { Hono } from "hono";

import * as authController from "../controllers/authController";

const authRoutes = new Hono();

// POST => /signup
authRoutes.post("/signup", authController.signup);
// POST => /login
authRoutes.post("/login", authController.login);

export default authRoutes;