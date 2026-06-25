import { Hono } from "hono";
import * as fileAttenteController from "../controllers/fileAttenteController";

const fileAttenteRoutes = new Hono();

fileAttenteRoutes.get(
  "/evenements/:evenementId/nombre-personnes",
  fileAttenteController.getNombrePersonnes
);

fileAttenteRoutes.post(
  "/evenements/:evenementId/inscription",
  fileAttenteController.inscrireFileAttente
);

export default fileAttenteRoutes;