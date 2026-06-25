export type Evenement = {
  id?: number;
  titre: string;
  description: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

export const evenementModel = {
  tableName: "evenements",

  champs: {
    titre: {
      requis: true,
      unique: true,
      max: 50,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "Le titre est requis",
        },
        {
          test: (valeur: string = "") => valeur.length <= 50,
          message: "Votre titre doit être entre 1 et 50 caractères",
        },
      ],
    },

    description: {
      requis: true,
      min: 6,
      max: 255,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "La description est requise",
        },
        {
          test: (valeur: string = "") =>
            valeur.length >= 6 && valeur.length <= 255,
          message: "La description doit contenir entre 6 et 255 caractères",
        },
      ],
    },

    date: {
      requis: true,
      validations: [
        {
          test: (valeur: string = "") => valeur.trim().length > 0,
          message: "La date est requise",
        },
        {
          test: (valeur: string = "") => !Number.isNaN(Date.parse(valeur)),
          message: "La date doit être valide",
        },
      ],
    },
  },
};

export const validerEvenement = (evenement: Evenement) => {
  const erreurs: string[] = [];

  Object.entries(evenementModel.champs).forEach(
    ([nomChamp, configuration]: any) => {
      const valeur = evenement[nomChamp as keyof Evenement];

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