export type FileAttente = {
  id?: number;
  utilisateurId: number;
  evenementId: number;
  position?: number;
  createdAt?: string;
};

export const fileAttenteModel = {
  tableName: "files_attente",

  champs: {
    utilisateurId: {
      requis: true,
      validations: [
        {
          test: (valeur: number) => Number.isInteger(valeur) && valeur > 0,
          message: "L'utilisateur est requis",
        },
      ],
    },

    evenementId: {
      requis: true,
      validations: [
        {
          test: (valeur: number) => Number.isInteger(valeur) && valeur > 0,
          message: "L'événement est requis",
        },
      ],
    },
  },
};

export const validerFileAttente = (fileAttente: FileAttente) => {
  const erreurs: string[] = [];

  Object.entries(fileAttenteModel.champs).forEach(
    ([nomChamp, configuration]: any) => {
      const valeur = fileAttente[nomChamp as keyof FileAttente];

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