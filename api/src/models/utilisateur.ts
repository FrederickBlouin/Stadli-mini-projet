export type Utilisateur = {
  id?: number;
  courriel: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  createdAt?: string;
  updatedAt?: string;
};

export const validerUtilisateur = (utilisateur: Utilisateur) => {
  const erreurs: string[] = [];

  if (!utilisateur.courriel?.trim()) erreurs.push("Le courriel est requis");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(utilisateur.courriel)) {
    erreurs.push("Le courriel doit être valide");
  }

  if (utilisateur.courriel.length > 50) {
    erreurs.push("Votre courriel doit être entre 1 et 50 caractères");
  }

  if (!utilisateur.motDePasse?.trim()) erreurs.push("Le mot de passe est requis");

  if (utilisateur.motDePasse.length < 6 || utilisateur.motDePasse.length > 255) {
    erreurs.push("Minimum 6 caractères");
  }

  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*\-]).+$/.test(utilisateur.motDePasse)) {
    erreurs.push("Doit contenir au moins 1 majuscule, 1 chiffre et 1 caractère spécial");
  }

  if (!utilisateur.nom?.trim()) erreurs.push("Le nom est requis");

  if (utilisateur.nom.length < 2 || utilisateur.nom.length > 50) {
    erreurs.push("Le nom doit contenir entre 2 et 50 caractères");
  }

  if (!utilisateur.prenom?.trim()) erreurs.push("Le prénom est requis");

  if (utilisateur.prenom.length < 2 || utilisateur.prenom.length > 50) {
    erreurs.push("Le prénom doit contenir entre 2 et 50 caractères");
  }

  return erreurs;
};