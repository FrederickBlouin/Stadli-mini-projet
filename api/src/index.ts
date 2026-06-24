import { Hono } from "hono";

import * as errorsController from "./controllers/errorsController";

// Importe les routes
import authRoutes from "./routes/auth";

const app = new Hono();

// Utilisation des routes en tant que middleware
app.route("/auth", authRoutes);

app.get("/", (context) => {
  return context.text("Hello Hono!");
});

// Gestion des erreurs 404
app.notFound(errorsController.get404);

// Gestion globale des erreurs
app.onError(errorsController.getErrors);

export default app;