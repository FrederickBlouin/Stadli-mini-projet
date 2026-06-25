import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { formatErrorResponse } from "../utils/formatErrorResponse";

/** Vérifie si la requête a un token JWT valide */

export const isAuth = async (context: Context, next: Next) => {
  // Récupère le jeton depuis l'en-tête Authorization de la requête
  const authHeader = context.req.header("Authorization");

  // Vérifie si l'en-tête Authorization est présent
  if (!authHeader) {
    return context.json(
      formatErrorResponse(
        401,
        "Unauthorized",
        "Vous n'êtes pas authentifié",
        context.req.path
      ),
      401
    );
  }

  // Récupère le jeton JWT
  const token = authHeader.split(" ")[1];

  try {
    // Vérifie le jeton et récupère les données associées
    const decodedToken = await verify(
      token,
      context.env.SECRET_JWT,
      "HS256"
    );

    // Ajoute les données associées au contexte pour utilisation ultérieure
    context.set("user", decodedToken);

    await next();
  } catch (err) {
    return context.json(
      formatErrorResponse(
        401,
        "Unauthorized",
        "Vous n'êtes pas authentifié",
        context.req.path
      ),
      401
    );
  }
};