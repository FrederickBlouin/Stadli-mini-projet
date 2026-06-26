import { Hono } from "hono";
import { isAuth } from "../middlewares/isAuth";
import * as fileAttenteController from "../controllers/fileAttenteController";

const fileAttenteRoutes = new Hono();

fileAttenteRoutes.get(
  "/evenements/:evenementId/nombre-personnes",
  fileAttenteController.getNombrePersonnes,
);

fileAttenteRoutes.post(
  "/evenements/:evenementId/inscription",
  isAuth,
  fileAttenteController.inscrireFileAttente,
);

fileAttenteRoutes.get(
  "/evenements/:evenementId/mon-inscription",
  isAuth,
  fileAttenteController.getMonInscription,
);

fileAttenteRoutes.post("/", fileAttenteController.createFileAttente);

export default fileAttenteRoutes;
