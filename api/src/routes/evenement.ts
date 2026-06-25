import { Hono } from "hono";

import * as evenementController from "../controllers/evenementController";

const evenementRoutes = new Hono();

// GET => /evenements
// Récupérer tous les événements
evenementRoutes.get("/evenements", evenementController.getEvenements);

// GET => /evenements/:evenementId
// Récupérer un événement selon son id
evenementRoutes.get(
  "/evenements/:id",
  evenementController.getEvenement
);

export default evenementRoutes;