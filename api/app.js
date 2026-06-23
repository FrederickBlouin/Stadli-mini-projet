"use strict";

import { Hono } from "hono";

const app = new Hono();

// Page d'accueil
app.get("/", (context) => {
  return context.text("Stadli waitlist API fonctionne!");
});

// Inscription à la liste d'attente
app.post("/signup", async (context) => {
  return context.json({
    message: "Inscription à venir",
  });
});

// Nombre d'inscrits
app.get("/count", async (context) => {
  return context.json({
    count: 0,
  });
});

// Export CSV protégé
app.get("/export", async (context) => {
  return context.text("Export CSV à venir");
});

export default app;