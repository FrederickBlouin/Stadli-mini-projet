"use strict";

import { Context } from "hono";
import { verify } from "hono/jwt";
import {
  formatErrorResponse,
  formatSuccessResponse,
} from "../utils/formatErrorResponse";

type JwtPayload = {
  id?: string;
  courriel?: string;
  nom?: string;
  prenom?: string;
};

/**
 * Récupère le nombre de personnes inscrites dans la file d'attente d'un événement.
 */
export const getNombrePersonnes = async (context: Context) => {
  try {
    const evenementId = context.req.param("evenementId");

    const evenement = await context.env.DB.prepare(
      "SELECT * FROM evenements WHERE id = ?",
    )
      .bind(evenementId)
      .first();

    if (!evenement) {
      return context.json(
        formatErrorResponse(
          404,
          "Not Found",
          "L'événement est introuvable",
          context.req.path,
        ),
        404,
      );
    }

    const result = (await context.env.DB.prepare(
      "SELECT COUNT(*) AS nombrePersonnes FROM files_attente WHERE evenementId = ?",
    )
      .bind(evenementId)
      .first()) as { nombrePersonnes: number } | null;

    return context.json(
      formatSuccessResponse(
        200,
        "Nombre de personnes récupéré avec succès",
        {
          evenementId: Number(evenementId),
          nombrePersonnes: result?.nombrePersonnes ?? 0,
        },
        context.req.path,
      ),
      200,
    );
  } catch (err) {
    return context.json(
      formatErrorResponse(
        500,
        "Internal Server Error",
        "Erreur serveur",
        context.req.path,
      ),
      500,
    );
  }
};

/**
 * Inscrit un utilisateur connecté dans la file d'attente d'un événement.
 */
export const inscrireFileAttente = async (context: Context) => {
  try {
    const evenementId = context.req.param("evenementId");

    const authorization = context.req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return context.json(
        formatErrorResponse(
          401,
          "Unauthorized",
          "Vous devez être connecté pour vous inscrire à une file d'attente",
          context.req.path,
        ),
        401,
      );
    }

    const token = authorization.split(" ")[1];

    const payload = (await verify(
      token,
      context.env.SECRET_JWT,
      "HS256",
    )) as JwtPayload;

    const utilisateurId = payload.id;

    if (!utilisateurId) {
      return context.json(
        formatErrorResponse(
          401,
          "Unauthorized",
          "Token invalide",
          context.req.path,
        ),
        401,
      );
    }

    const evenement = await context.env.DB.prepare(
      "SELECT * FROM evenements WHERE id = ?",
    )
      .bind(evenementId)
      .first();

    if (!evenement) {
      return context.json(
        formatErrorResponse(
          404,
          "Not Found",
          "L'événement est introuvable",
          context.req.path,
        ),
        404,
      );
    }

    const inscriptionExistante = await context.env.DB.prepare(
      "SELECT * FROM files_attente WHERE utilisateurId = ? AND evenementId = ?",
    )
      .bind(utilisateurId, evenementId)
      .first();

    if (inscriptionExistante) {
      return context.json(
        formatErrorResponse(
          409,
          "Conflict",
          "Vous êtes déjà inscrit à cette file d'attente",
          context.req.path,
        ),
        409,
      );
    }

    const nombrePersonnes = (await context.env.DB.prepare(
      "SELECT COUNT(*) AS total FROM files_attente WHERE evenementId = ?",
    )
      .bind(evenementId)
      .first()) as { total: number } | null;

    const position = (nombrePersonnes?.total ?? 0) + 1;

    const result = await context.env.DB.prepare(
      `INSERT INTO files_attente
        (utilisateurId, evenementId, position)
       VALUES (?, ?, ?)`,
    )
      .bind(utilisateurId, evenementId, position)
      .run();

    return context.json(
      formatSuccessResponse(
        201,
        "Inscription à la file d'attente réussie",
        {
          id: result.meta.last_row_id,
          utilisateurId: Number(utilisateurId),
          evenementId: Number(evenementId),
          position,
        },
        context.req.path,
      ),
      201,
    );
  } catch (err) {
    return context.json(
      formatErrorResponse(
        500,
        "Internal Server Error",
        "Erreur serveur",
        context.req.path,
      ),
      500,
    );
  }
};

export const createFileAttente = async (context: Context) => {
  try {
    const body = await context.req.json();

    const { utilisateurId, evenementId } = body;

    if (!utilisateurId || !evenementId) {
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

    const inscriptionExistante = await context.env.DB.prepare(
      "SELECT * FROM files_attente WHERE utilisateurId = ? AND evenementId = ?"
    )
      .bind(utilisateurId, evenementId)
      .first();

    if (inscriptionExistante) {
      return context.json(
        formatErrorResponse(
          409,
          "Conflict",
          "Cet utilisateur est déjà inscrit à cette file d'attente",
          context.req.path
        ),
        409
      );
    }

    const nombrePersonnes = (await context.env.DB.prepare(
      "SELECT COUNT(*) AS total FROM files_attente WHERE evenementId = ?"
    )
      .bind(evenementId)
      .first()) as { total: number } | null;

    const position = (nombrePersonnes?.total ?? 0) + 1;

    const result = await context.env.DB.prepare(
      `INSERT INTO files_attente
        (utilisateurId, evenementId, position)
       VALUES (?, ?, ?)`
    )
      .bind(utilisateurId, evenementId, position)
      .run();

    return context.json(
      formatSuccessResponse(
        201,
        "Inscription à la file d'attente créée avec succès",
        {
          id: result.meta.last_row_id,
          utilisateurId,
          evenementId,
          position,
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