import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UtilisateurConnexion from "../components/UtilisateurConnexion";

type UtilisateurLogin = {
  email: string;
  password: string;
};

function ConnexionView() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = async (utilisateur: UtilisateurLogin) => {
    try {
      setErrorMessage("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courriel: utilisateur.email,
          motDePasse: utilisateur.password,
        }),
      });

      if (!response.ok) {
        const erreur = await response.json();
        throw new Error(erreur.message || "Mot de passe ou courriel invalide");
      }

      const data = await response.json();

      localStorage.setItem("jwt", data.data.token);

      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    }
  };

  return (
    <div>
      <h2>Connexion</h2>

      <UtilisateurConnexion onLogin={login} />

      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}

      <div>
        <Link to="/inscription" className="mt-3">
          Vous n'êtes pas inscrit? Veuillez remplir le formulaire d'inscription
        </Link>
      </div>
    </div>
  );
}

export default ConnexionView;