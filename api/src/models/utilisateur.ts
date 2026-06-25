export type Utilisateur = {
  id?: number;
  courriel: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  createdAt?: string;
  updatedAt?: string;
};

export const utilisateurModel = {
  tableName: "utilisateurs",

  champs: {
    courriel: {
      requis: true,
      unique: true,
      max: 50,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "Le courriel est requis",
        },
        {
          test: (valeur: string = "") =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur),
          message: "Le courriel doit être valide",
        },
        {
          test: (valeur: string = "") => valeur.length <= 50,
          message: "Votre courriel doit être entre 1 et 50 caractères",
        },
      ],
    },

    motDePasse: {
      requis: true,
      min: 6,
      max: 255,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "Le mot de passe est requis",
        },
        {
          test: (valeur: string = "") => valeur.length >= 6,
          message: "Minimum 6 caractères",
        },
        {
          test: (valeur: string = "") =>
            /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*\-]).+$/.test(valeur),
          message:
            "Doit contenir au moins 1 majuscule, 1 chiffre et 1 caractère spécial",
        },
      ],
    },

    nom: {
      requis: true,
      max: 50,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "Le nom est requis",
        },
        {
          test: (valeur: string = "") =>
            valeur.length >= 2 && valeur.length <= 50,
          message: "Doit contenir entre 2 et 50 caractères",
        },
      ],
    },

    prenom: {
      requis: true,
      max: 50,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "Le prénom est requis",
        },
        {
          test: (valeur: string = "") =>
            valeur.length >= 2 && valeur.length <= 50,
          message: "Doit contenir entre 2 et 50 caractères",
        },
      ],
    },

  },
};

export const validerUtilisateur = (utilisateur: Utilisateur) => {
  const erreurs: string[] = [];

  Object.entries(utilisateurModel.champs).forEach(
    ([nomChamp, configuration]: any) => {
      const valeur = utilisateur[nomChamp as keyof Utilisateur];

      if (!configuration.validations) {
        return;
      }

      configuration.validations.forEach((validation: any) => {
        if (!validation.test(valeur)) {
          erreurs.push(validation.message);
        }
      });
    }
  );

  return erreurs;
};