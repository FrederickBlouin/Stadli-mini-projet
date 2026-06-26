import { useState } from "react";

type UtilisateurAjoutProps = {
  erreurApi: string;
  onAjouterUtilisateur: (utilisateur: {
    nom: string;
    prenom: string;
    courriel: string;
    motDePasse: string;
    motDePasseConfirmation: string;
  }) => void;
};

function UtilisateurAjout({
  erreurApi,
  onAjouterUtilisateur,
}: UtilisateurAjoutProps) {
  const [utilisateurNom, setUtilisateurNom] = useState("");
  const [utilisateurPrenom, setUtilisateurPrenom] = useState("");
  const [utilisateurCourriel, setUtilisateurCourriel] = useState("");
  const [utilisateurMotDePasse, setUtilisateurMotDePasse] = useState("");
  const [
    utilisateurConfirmationMotDePasse,
    setUtilisateurConfirmationMotDePasse,
  ] = useState("");

  const [utilisateurNomValide, setUtilisateurNomValide] = useState(false);
  const [utilisateurPrenomValide, setUtilisateurPrenomValide] = useState(false);
  const [utilisateurCourrielValide, setUtilisateurCourrielValide] =
    useState(false);
  const [utilisateurMotDePasseValide, setUtilisateurMotDePasseValide] =
    useState(false);
  const [
    utilisateurConfirmationMotDePasseValide,
    setUtilisateurConfirmationMotDePasseValide,
  ] = useState(false);

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const regexMotDePasse = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/;

  const valideForm = () => {
    let formIsValid = true;

    setUtilisateurNomValide(false);
    setUtilisateurPrenomValide(false);
    setUtilisateurCourrielValide(false);
    setUtilisateurMotDePasseValide(false);
    setUtilisateurConfirmationMotDePasseValide(false);

    if (utilisateurNom.trim().length < 1 || utilisateurNom.trim().length > 50) {
      setUtilisateurNomValide(true);
      formIsValid = false;
    }

    if (
      utilisateurPrenom.trim().length < 2 ||
      utilisateurPrenom.trim().length > 50
    ) {
      setUtilisateurPrenomValide(true);
      formIsValid = false;
    }

    if (
      utilisateurCourriel.trim().length === 0 ||
      !regexEmail.test(utilisateurCourriel)
    ) {
      setUtilisateurCourrielValide(true);
      formIsValid = false;
    }

    if (
      utilisateurMotDePasse.trim().length < 6 ||
      !regexMotDePasse.test(utilisateurMotDePasse)
    ) {
      setUtilisateurMotDePasseValide(true);
      formIsValid = false;
    }

    if (utilisateurConfirmationMotDePasse !== utilisateurMotDePasse) {
      setUtilisateurConfirmationMotDePasseValide(true);
      formIsValid = false;
    }

    return formIsValid;
  };

  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = valideForm();

    if (!formIsValid) {
      return;
    }

    onAjouterUtilisateur({
      nom: utilisateurNom,
      prenom: utilisateurPrenom,
      courriel: utilisateurCourriel,
      motDePasse: utilisateurMotDePasse,
      motDePasseConfirmation: utilisateurConfirmationMotDePasse,
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <form onSubmit={submitData} className="mt-5">
          <div className="mb-3">
            <label htmlFor="inputNom" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className={
                utilisateurNomValide
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputNom"
              value={utilisateurNom}
              onChange={(event) => setUtilisateurNom(event.target.value)}
              placeholder="Votre nom"
            />
            {utilisateurNomValide && (
              <p className="invalid-feedback">Votre nom est invalide</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="inputPrenom" className="form-label">
              Prénom
            </label>
            <input
              type="text"
              className={
                utilisateurPrenomValide
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputPrenom"
              value={utilisateurPrenom}
              onChange={(event) => setUtilisateurPrenom(event.target.value)}
              placeholder="Votre prénom"
            />
            {utilisateurPrenomValide && (
              <p className="invalid-feedback">
                Votre prénom doit contenir entre 2 et 50 caractères
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="inputCourriel" className="form-label">
              Courriel
            </label>
            <input
              type="email"
              className={
                utilisateurCourrielValide
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputCourriel"
              value={utilisateurCourriel}
              onChange={(event) => setUtilisateurCourriel(event.target.value)}
              placeholder="Votre courriel"
            />
            {utilisateurCourrielValide && (
              <p className="invalid-feedback">Votre courriel est invalide</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="inputMotDePasse" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className={
                utilisateurMotDePasseValide
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputMotDePasse"
              value={utilisateurMotDePasse}
              onChange={(event) => setUtilisateurMotDePasse(event.target.value)}
              placeholder="Votre mot de passe"
            />
            {utilisateurMotDePasseValide && (
              <p className="invalid-feedback">
                Votre mot de passe doit contenir au moins 6 caractères, une
                majuscule, un chiffre et un caractère spécial
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="inputConfirmationMotDePasse" className="form-label">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              className={
                utilisateurConfirmationMotDePasseValide
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputConfirmationMotDePasse"
              value={utilisateurConfirmationMotDePasse}
              onChange={(event) =>
                setUtilisateurConfirmationMotDePasse(event.target.value)
              }
              placeholder="Votre mot de passe"
            />
            {utilisateurConfirmationMotDePasseValide && (
              <p className="invalid-feedback">
                Votre confirmation est différente de votre mot de passe
              </p>
            )}
          </div>

          {erreurApi && <p className="text-danger">{erreurApi}</p>}

          <button type="submit" className="btn btn-primary">
            Inscription
          </button>
        </form>
      </div>
    </div>
  );
}

export default UtilisateurAjout;
