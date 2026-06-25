const utilisateurs = [
  {
    prenom: "Jean",
    nom: "Poulet",
    courriel: "jean.poulet@test.com",
  },
  {
    prenom: "Sabin",
    nom: "Roy",
    courriel: "sabin.roy@test.com",
  },
  {
    prenom: "Marie",
    nom: "Tremblay",
    courriel: "marie.tremblay@test.com",
  },
  {
    prenom: "Julie",
    nom: "Gagnon",
    courriel: "julie.gagnon@test.com",
  },
  {
    prenom: "Samuel",
    nom: "Bouchard",
    courriel: "samuel.bouchard@test.com",
  },
  {
    prenom: "Alexandre",
    nom: "Lefebvre",
    courriel: "alex.lefebvre@test.com",
  },
  {
    prenom: "Camille",
    nom: "Lavoie",
    courriel: "camille.lavoie@test.com",
  },
  {
    prenom: "Thomas",
    nom: "Caron",
    courriel: "thomas.caron@test.com",
  },
  {
    prenom: "Sophie",
    nom: "Martel",
    courriel: "sophie.martel@test.com",
  },
  {
    prenom: "David",
    nom: "Morin",
    courriel: "david.morin@test.com",
  },
];

const evenements = [
  {
    titre: "Festival d'été",
    description: "Concerts extérieurs au centre-ville.",
    date: "2026-07-10 20:00:00",
  },
  {
    titre: "Salon du jeu vidéo",
    description: "Découverte des nouveautés gaming.",
    date: "2026-09-15 09:30:00",
  },
  {
    titre: "Conférence React",
    description: "Journée de conférences sur React.",
    date: "2026-10-21 08:30:00",
  },
];

const inscriptions = [
  { utilisateur: "jean.poulet@test.com", evenement: "Festival d'été" },
  { utilisateur: "sabin.roy@test.com", evenement: "Festival d'été" },
  { utilisateur: "marie.tremblay@test.com", evenement: "Festival d'été" },
  { utilisateur: "julie.gagnon@test.com", evenement: "Festival d'été" },
  { utilisateur: "samuel.bouchard@test.com", evenement: "Festival d'été" },

  { utilisateur: "jean.poulet@test.com", evenement: "Salon du jeu vidéo" },
  { utilisateur: "alex.lefebvre@test.com", evenement: "Salon du jeu vidéo" },
  { utilisateur: "camille.lavoie@test.com", evenement: "Salon du jeu vidéo" },
  { utilisateur: "thomas.caron@test.com", evenement: "Salon du jeu vidéo" },
  { utilisateur: "sophie.martel@test.com", evenement: "Salon du jeu vidéo" },

  { utilisateur: "jean.poulet@test.com", evenement: "Conférence React" },
  { utilisateur: "marie.tremblay@test.com", evenement: "Conférence React" },
  { utilisateur: "samuel.bouchard@test.com", evenement: "Conférence React" },
  { utilisateur: "thomas.caron@test.com", evenement: "Conférence React" },
  { utilisateur: "david.morin@test.com", evenement: "Conférence React" },
];

const BASE_URL = "http://127.0.0.1:8787";

async function creerUtilisateurs() {
  console.log("Création des utilisateurs...");

  for (const utilisateur of utilisateurs) {
    await fetch(`${URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...utilisateur,
        motDePasse: "Password123!",
        motDePasseConfirmation: "Password123!",
      }),
    });
  }
}

async function creerEvenements() {
  console.log("Création des événements...");

  for (const evenement of evenements) {
    await fetch(`${URL}/evenements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evenement),
    });
  }
}

async function inscrireUtilisateurs() {
  console.log("Création des files d'attente...");

  for (const inscription of inscriptions) {
    await fetch(`${URL}/file-attente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inscription),
    });
  }
}

async function seed() {
  try {
    await creerUtilisateurs();
    await creerEvenements();
    await inscrireUtilisateurs();

    console.log("Seed terminé avec succès.");
  } catch (erreur) {
    console.error("Erreur lors du seed :", erreur);
  }
}

seed();