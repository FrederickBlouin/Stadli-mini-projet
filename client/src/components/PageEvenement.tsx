import { Link } from "react-router-dom";

type PageEvenementProps = {
  titre: string;
  description: string;
  date: string;
  nombrePersonnes: number;
  estConnecte: boolean;
  estInscrit: boolean;
  messageInscription: string;
  onInscription: () => void;
};

function PageEvenement({
  titre,
  description,
  date,
  nombrePersonnes,
  estConnecte,
  estInscrit,
  messageInscription,
  onInscription,
}: PageEvenementProps) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">{titre}</h2>

        <h6 className="card-subtitle mb-3 text-body-secondary">
          {new Date(date).toLocaleDateString("fr-CA")}
        </h6>

        <p className="card-text">{description}</p>

        <div className="alert alert-info mt-4">
          Nombre de personnes dans la liste d'attente :{" "}
          <strong>{nombrePersonnes}</strong>
        </div>

        {!estConnecte && (
          <Link to="/connexion">
            Pour vous inscrire veuillez vous connecter
          </Link>
        )}

        {estConnecte && estInscrit && (
          <p className="text-success">
            Vous êtes sur la liste d'attente de cet événement
          </p>
        )}

        {estConnecte && !estInscrit && (
          <button className="btn btn-primary" onClick={onInscription}>
            S'inscrire à la liste d'attente
          </button>
        )}

        {messageInscription && (
          <p className="mt-3 text-success">{messageInscription}</p>
        )}
      </div>
    </div>
  );
}

export default PageEvenement;