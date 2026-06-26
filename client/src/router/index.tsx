import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import AccueilView from "../views/AccueilView";
// import ConnexionView from "../views/ConnexionView";
// import InscriptionView from "../views/InscriptionView";
// import EvenementDetailView from "../views/EvenementDetailView";
// import NotFoundView from "../views/NotFoundView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AccueilView />,
      },
    //   {
    //     path: "connexion",
    //     element: <ConnexionView />,
    //   },
    //   {
    //     path: "inscription",
    //     element: <InscriptionView />,
    //   },
    //   {
    //     path: "evenements/:evenementId",
    //     element: <EvenementDetailView />,
    //   },
    //   {
    //     path: "*",
    //     element: <NotFoundView />,
    //   },
    ],
  },
]);

export default router;