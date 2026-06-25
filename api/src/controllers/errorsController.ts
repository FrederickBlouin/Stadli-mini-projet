import { Context } from "hono";
import { formatErrorResponse } from "../utils/formatErrorResponse";

/**
 * Gestion des erreurs 404.
 *
 * @param context Objet de contexte Hono.
 * @returns Réponse JSON formatée.
 */
export const get404 = (context: Context) => {
  return context.json(
    formatErrorResponse(
      404,
      "Not Found",
      "La ressource demandée est introuvable.",
      context.req.path
    ),
    404
  );
};

/**
 * Gestion globale des erreurs.
 *
 * @param erreur Objet d'erreur.
 * @param context Objet de contexte Hono.
 * @returns Réponse JSON formatée.
 */
export const getErrors = (erreur: unknown, context: Context) => {
  let statusCode = 500;
  let errorType = "Internal Server Error";
  let message = "Une erreur interne est survenue.";

  if (erreur instanceof Error) {
    message = erreur.message;
  }

  return context.json(
    formatErrorResponse(
      statusCode,
      errorType,
      message,
      context.req.path
    ),
    statusCode
  );
};