import { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { formatErrorResponse } from "../utils/formatErrorResponse";

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

export const getErrors = (erreur: unknown, context: Context) => {
  let statusCode: ContentfulStatusCode = 500;
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