"use strict";

import { Context, HonoRequest } from "hono";
import { Utilisateur, validerUtilisateur } from "../models/utilisateur";
import { formatErrorResponse, formatSuccessResponse } from "../utils/formatErrorResponse";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

/**
 * 
 * @param context 
 * @returns {Promise<void>} Répond avec un message de succès ou une erreur formatée.
 */
export const signup = async (context: Context) => {
  try {
    const body = await context.req.json();
    
    const {
      prenom,
      nom,
      courriel,
      motDePasse,
      motDePasseConfirmation,
    } = body;

    if (!prenom || !nom || !courriel || !motDePasse || !motDePasseConfirmation) {
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

    if (motDePasse !== motDePasseConfirmation) {
      return context.json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le mot de passe est différent de celui en confirmation",
          context.req.path
        ),
        422
      );
    }

    const erreurs = validerUtilisateur({
      prenom,
      nom,
      courriel,
      motDePasse,
    });

    if (erreurs.length > 0) {
      return context.json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          erreurs[0],
          context.req.path
        ),
        422
      );
    }

    const utilisateurExistant = await context.env.DB.prepare(
      "SELECT * FROM utilisateurs WHERE courriel = ?"
    )
      .bind(courriel)
      .first();

    if (utilisateurExistant) {
      return context.json(
        formatErrorResponse(
          409,
          "Conflict",
          "Un utilisateur a déjà ce courriel",
          context.req.path
        ),
        409
      );
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 12);

    const result = await context.env.DB.prepare(
      `INSERT INTO utilisateurs 
        (prenom, nom, courriel, motDePasse)
       VALUES (?, ?, ?, ?)`
    )
      .bind(prenom, nom, courriel, hashedPassword)
      .run();

    return context.json(
      formatSuccessResponse(
        201,
        "Utilisateur ajouté avec succès!",
        {
          id: result.meta.last_row_id,
          prenom,
          nom,
          courriel,
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

/**
 * 
 * @param context 
 * @returns {Promise<void>} Répond avec un token JWT ou une erreur formatée.
 */
export const login = async (context: Context) => {
  try {
    const body = await context.req.json();

    const { courriel, motDePasse } = body;

    if (!courriel || !motDePasse) {
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

    const utilisateur = await context.env.DB.prepare(
      "SELECT * FROM utilisateurs WHERE courriel = ?"
    )
      .bind(courriel)
      .first();

    if (!utilisateur) {
      return context.json(
        formatErrorResponse(
          401,
          "Unauthorized",
          "Courriel ou mot de passe invalide",
          context.req.path
        ),
        401
      );
    }

    const isEqual = await bcrypt.compare(
      motDePasse,
      utilisateur.motDePasse as string
    );

    if (!isEqual) {
      return context.json(
        formatErrorResponse(
          401,
          "Unauthorized",
          "Courriel ou mot de passe invalide",
          context.req.path
        ),
        401
      );
    }

    const token = await sign(
      {
        courriel: utilisateur.courriel,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        id: utilisateur.id?.toString(),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      context.env.SECRET_JWT
    );

    return context.json(
      formatSuccessResponse(
        200,
        "Connexion réussie",
        { token },
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