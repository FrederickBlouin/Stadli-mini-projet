import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  prenom?: string;
};

function getConnexionInitiale() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return {
      estConnecte: false,
      prenom: "",
    };
  }

  const decoded = jwtDecode<TokenPayload>(token);

  return {
    estConnecte: true,
    prenom: decoded.prenom ?? "",
  };
}

function App() {
  const navigate = useNavigate();

  const [connexion, setConnexion] = useState(getConnexionInitiale);

  const logout = () => {
    localStorage.removeItem("jwt");

    setConnexion({
      estConnecte: false,
      prenom: "",
    });

    navigate("/");
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-primary mb-3">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">
              Stadli
            </Link>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!connexion.estConnecte && (
                  <li className="nav-item">
                    <Link to="/connexion" className="nav-link text-white">
                      Connexion
                    </Link>
                  </li>
                )}

                {!connexion.estConnecte && (
                  <li className="nav-item">
                    <Link to="/inscription" className="nav-link text-white">
                      Inscription
                    </Link>
                  </li>
                )}

                {connexion.estConnecte && (
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={logout}
                    >
                      Déconnexion
                    </button>
                  </li>
                )}

                {connexion.estConnecte && connexion.prenom && (
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      Bonjour {connexion.prenom}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;