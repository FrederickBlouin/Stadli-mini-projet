import { useState } from "react";

type UtilisateurConnexionProps = {
  onLogin: (utilisateur: {
    email: string;
    password: string;
  }) => void;
};

function UtilisateurConnexion({ onLogin }: UtilisateurConnexionProps) {
  const [utilisateurCourriel, setUtilisateurCourriel] = useState("");
  const [utilisateurMotDePasse, setUtilisateurMotDePasse] = useState("");

  const [utilisateurCourrielValide, setUtilisateurCourrielValide] =
    useState(false);
  const [utilisateurMotDePasseValide, setUtilisateurMotDePasseValide] =
    useState(false);

  const valideForm = () => {
    let formIsValid = true;

    setUtilisateurCourrielValide(false);
    setUtilisateurMotDePasseValide(false);

    if (utilisateurCourriel.trim().length === 0) {
      setUtilisateurCourrielValide(true);
      formIsValid = false;
    }

    if (utilisateurMotDePasse.trim().length < 6) {
      setUtilisateurMotDePasseValide(true);
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

    onLogin({
      email: utilisateurCourriel,
      password: utilisateurMotDePasse,
    });
  };

  return (
    <form onSubmit={submitData} className="mt-5 mb-3">
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
          <p className="invalid-feedback">Votre mot de passe est invalide</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Se connecter
      </button>
    </form>
  );
}

export default UtilisateurConnexion;