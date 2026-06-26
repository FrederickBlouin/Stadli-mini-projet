import { Hono } from "hono";
import { cors } from "hono/cors";

import * as errorsController from "./controllers/errorsController";

import authRoutes from "./routes/auth";
import evenementRoutes from "./routes/evenement";
import fileAttenteRoutes from "./routes/fileAttente";
import seedRoutes from "./routes/seed";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.route("/auth", authRoutes);
app.route("/", evenementRoutes);
app.route("/file-attente", fileAttenteRoutes);
app.route("/seed", seedRoutes);

app.get("/", (context) => {
  return context.text("Hello Hono!");
});

app.notFound(errorsController.get404);
app.onError(errorsController.getErrors);

export default app;