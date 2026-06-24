/**
 * Génère une réponse d'erreur formatée pour l'API
 *
 * @param statusCode Code HTTP
 * @param errorType Type d'erreur
 * @param message Message détaillé
 * @param path URL concernée
 * @returns Objet JSON formaté
 */
export const formatErrorResponse = (
  statusCode: number,
  errorType: string,
  message: string,
  path: string
) => {
  return {
    status: statusCode,
    error: errorType,
    message,
    path,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Génère une réponse de succès formatée pour l'API
 *
 * @param statusCode Code HTTP
 * @param message Message de confirmation
 * @param data Données retournées
 * @param path URL concernée
 * @returns Objet JSON formaté
 */
export const formatSuccessResponse = (
  statusCode: number,
  message: string,
  data: unknown,
  path: string
) => {
  return {
    status: statusCode,
    message,
    data: data ?? null,
    path,
    timestamp: new Date().toISOString(),
  };
};