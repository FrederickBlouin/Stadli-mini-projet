import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UtilisateurAjout from "../components/UtilisateurAjout";

type NouvelUtilisateur = {
  nom: string;
  prenom: string;
  courriel: string;
  motDePasse: string;
  motDePasseConfirmation: string;
};

function InscriptionView() {
  const [erreurApi, setErreurApi] = useState("");
  const [messageSucces, setMessageSucces] = useState("");
  const navigate = useNavigate();

  const ajoutUtilisateur = async (utilisateur: NouvelUtilisateur) => {
    try {
      setErreurApi("");
      setMessageSucces("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });

      if (!response.ok) {
        const erreur = await response.json();

        if (response.status === 409) {
          setErreurApi("Ce courriel est déjà utilisé");
        } else {
          setErreurApi(erreur.message || "Une erreur est survenue");
        }

        return;
      }

      setMessageSucces("Le compte a été créé avec succès!");

      setTimeout(() => {
        navigate("/connexion");
      }, 1500);
    } catch {
      setErreurApi("Une erreur est survenue lors de la connexion au serveur.");
    }
  };

  return (
    <div className="inscription">
      <h1>Création d'un compte</h1>

      {messageSucces && (
        <div className="alert alert-success mt-3">{messageSucces}</div>
      )}

      <UtilisateurAjout
        erreurApi={erreurApi}
        onAjouterUtilisateur={ajoutUtilisateur}
      />
    </div>
  );
}

export default InscriptionView;