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

export const createEvenement = async (context: Context) => {
  try {
    const body = await context.req.json();

    const { titre, description, date } = body;

    if (!titre || !description || !date) {
      return context.json(
        formatErrorResponse(
          400,
          "Bad Request",
          "Un des paramètres est manquant",
          context.req.path
        ),
        400
      );
    }

    const result = await context.env.DB.prepare(
      `INSERT INTO evenements 
        (titre, description, date)
       VALUES (?, ?, ?)`
    )
      .bind(titre, description, date)
      .run();

    return context.json(
      formatSuccessResponse(
        201,
        "Événement créé avec succès",
        {
          id: result.meta.last_row_id,
          titre,
          description,
          date,
        },
        context.req.path
      ),
      201
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