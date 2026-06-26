import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Evenement = {
  id: number;
  titre: string;
  description: string;
  date: string;
};

function AccueilView() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [erreurApi, setErreurApi] = useState("");

  useEffect(() => {
    let annule = false;

    fetch(`${import.meta.env.VITE_API_URL}/evenements`)
      .then((reponse) => reponse.json())
      .then((data) => {
        if (annule) {
          return;
        }

        if (data.status !== 200) {
          setErreurApi(data.message || "Erreur lors du chargement des événements");
          return;
        }

        setEvenements(data.data);
      })
      .catch(() => {
        if (!annule) {
          setErreurApi("Impossible de communiquer avec le serveur");
        }
      });

    return () => {
      annule = true;
    };
  }, []);

  return (
    <div className="container">
      <div className="mb-4">
        <h1>Liste d'attente Stadli</h1>
        <p>
          Consultez les événements disponibles et inscrivez-vous à une liste
          d'attente.
        </p>
      </div>

      {erreurApi && <div className="alert alert-danger">{erreurApi}</div>}

      <div className="row">
        {evenements.map((evenement) => (
          <div className="col-md-4 mb-3" key={evenement.id}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{evenement.titre}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {new Date(evenement.date).toLocaleDateString("fr-CA")}
                </h6>
                <p className="card-text">{evenement.description}</p>
                <Link
                  to={`/evenements/${evenement.id}`}
                  className="btn btn-primary"
                >
                  Détail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {evenements.length === 0 && !erreurApi && (
        <p>Aucun événement disponible pour le moment.</p>
      )}
    </div>
  );
}

export default AccueilView;