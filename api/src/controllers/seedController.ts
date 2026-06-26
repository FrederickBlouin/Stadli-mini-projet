import { Context } from "hono";
import {
  formatErrorResponse,
  formatSuccessResponse,
} from "../utils/formatErrorResponse";

export const resetTables = async (context: Context) => {
  try {
    await context.env.DB.prepare("DELETE FROM files_attente").run();
    await context.env.DB.prepare("DELETE FROM evenements").run();
    await context.env.DB.prepare("DELETE FROM utilisateurs").run();

    await context.env.DB.prepare(
      "DELETE FROM sqlite_sequence WHERE name IN ('files_attente', 'evenements', 'utilisateurs')"
    ).run();

    return context.json(
      formatSuccessResponse(
        200,
        "Tables réinitialisées avec succès",
        null,
        context.req.path
      ),
      200
    );
  } catch (err) {
    return context.json(
      formatErrorResponse(
        500,
        "Internal Server Error",
        "Erreur lors de la réinitialisation des tables",
        context.req.path
      ),
      500
    );
  }
};