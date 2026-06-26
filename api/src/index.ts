import { Hono } from "hono";

import * as errorsController from "./controllers/errorsController";

// Importe les routes
import authRoutes from "./routes/auth";
import evenementRoutes from "./routes/evenement";
import fileAttenteRoutes from "./routes/fileAttente";

const app = new Hono();

// Utilisation des routes en tant que middleware
app.route("/auth", authRoutes);
app.route("/", evenementRoutes);
app.route("/file-attente", fileAttenteRoutes);

app.get("/", (context) => {
  return context.text("Hello Hono!");
});

// Gestion des erreurs 404
app.notFound(errorsController.get404);

// Gestion globale des erreurs
app.onError(errorsController.getErrors);

export default app;