"use strict";

import { Context, HonoRequest } from "hono";
import { formatErrorResponse, formatSuccessResponse } from "../utils/formatErrorResponse";

export const getEvenements = async (context: Context) => {
  try {
    const evenements = await context.env.DB.prepare(
      "SELECT * FROM evenements ORDER BY date ASC"
    ).all();

    return context.json(
      formatSuccessResponse(
        200,
        "Événements récupérés avec succès",
        evenements.results,
        context.req.path
      ),
      200
    );
  } catch (err) {
    return context.json(
      formatErrorResponse(
        500,
        "Internal Server Error",
        "Erreur serveur",
        context.req.path
      ),
      500
    );
  }
};

export const getEvenement = async (context: Context) => {
  try {
    const id = context.req.param("id");

    const evenement = await context.env.DB.prepare(
      "SELECT * FROM evenements WHERE id = ?"
    )
      .bind(id)
      .first();

    if (!evenement) {
      return context.json(
        formatErrorResponse(
          404,
          "Not Found",
          "L'événement est introuvable",
          context.req.path
        ),
        404
      );
    }

    return context.json(
      formatSuccessResponse(
        200,
        "Événement récupéré avec succès",
        evenement,
        context.req.path
      ),
      200
    );
  } catch (err) {
    return context.json(
      formatErrorResponse(
        500,
        "Internal Server Error",
        "Erreur serveur",
        context.req.path
      ),
      500
    );
  }
};