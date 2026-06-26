import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageEvenement from "../components/PageEvenement";

type Evenement = {
  id: number;
  titre: string;
  description: string;
  date: string;
};

function EvenementView() {
  const { evenementId } = useParams();

  const [evenement, setEvenement] = useState<Evenement | null>(null);
  const [nombrePersonnes, setNombrePersonnes] = useState(0);
  const [erreurApi, setErreurApi] = useState("");
  const [estInscrit, setEstInscrit] = useState(false);
  const [messageInscription, setMessageInscription] = useState("");

  const token = localStorage.getItem("jwt");
  const estConnecte = !!token;

  useEffect(() => {
    let annule = false;

    fetch(`${import.meta.env.VITE_API_URL}/evenements/${evenementId}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        if (!annule) {
          setEvenement(data.data);
        }
      })
      .catch(() => {
        if (!annule) {
          setErreurApi("Impossible de communiquer avec le serveur");
        }
      });

    return () => {
      annule = true;
    };
  }, [evenementId]);

  useEffect(() => {
    let annule = false;

    const chargerNombrePersonnes = () => {
      fetch(
        `${import.meta.env.VITE_API_URL}/file-attente/evenements/${evenementId}/nombre-personnes`
      )
        .then((reponse) => reponse.json())
        .then((data) => {
          if (!annule) {
            setNombrePersonnes(data.data.nombrePersonnes);
          }
        })
        .catch(() => {});
    };

    chargerNombrePersonnes();

    const interval = setInterval(chargerNombrePersonnes, 5000);

    return () => {
      annule = true;
      clearInterval(interval);
    };
  }, [evenementId]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let annule = false;

    fetch(
      `${import.meta.env.VITE_API_URL}/file-attente/evenements/${evenementId}/mon-inscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        if (!annule) {
          setEstInscrit(data.data.estInscrit);
        }
      })
      .catch(() => {});

    return () => {
      annule = true;
    };
  }, [evenementId, token]);

  const inscrireFileAttente = async () => {
    if (!token) {
      return;
    }

    const reponse = await fetch(
      `${import.meta.env.VITE_API_URL}/file-attente/evenements/${evenementId}/inscription`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await reponse.json();

    if (!reponse.ok) {
      setErreurApi(data.message || "Erreur lors de l'inscription");
      return;
    }

    setEstInscrit(true);
    setMessageInscription("Vous êtes maintenant inscrit à la liste d'attente");
    setNombrePersonnes((ancienNombre) => ancienNombre + 1);
  };

  if (erreurApi) {
    return <div className="alert alert-danger">{erreurApi}</div>;
  }

  if (!evenement) {
    return <p>Chargement de l'événement...</p>;
  }

  return (
    <PageEvenement
      titre={evenement.titre}
      description={evenement.description}
      date={evenement.date}
      nombrePersonnes={nombrePersonnes}
      estConnecte={estConnecte}
      estInscrit={estInscrit}
      messageInscription={messageInscription}
      onInscription={inscrireFileAttente}
    />
  );
}

export default EvenementView;