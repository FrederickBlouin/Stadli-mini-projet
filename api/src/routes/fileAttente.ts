import { Hono } from "hono";
import { isAuth } from "../middlewares/isAuth";
import * as fileAttenteController from "../controllers/fileAttenteController";

const fileAttenteRoutes = new Hono();

fileAttenteRoutes.get(
  "/evenements/:evenementId/nombre-personnes",
  fileAttenteController.getNombrePersonnes
);

fileAttenteRoutes.post(
  "/evenements/:evenementId/inscription", isAuth,
  fileAttenteController.inscrireFileAttente
);

export default fileAttenteRoutes;