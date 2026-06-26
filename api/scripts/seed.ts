import "dotenv/config";

const BASE_URL = process.env.BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL est manquant dans le fichier .env");
}

async function viderTables() {
  console.log("Réinitialisation des tables...");

  await fetch(`${BASE_URL}/seed/reset`, {
    method: "DELETE",
  });
}



const utilisateurs = [
  { prenom: "Jean", nom: "Poulet", courriel: "jean.poulet@test.com" },
  { prenom: "Sabin", nom: "Roy", courriel: "sabin.roy@test.com" },
  { prenom: "Marie", nom: "Tremblay", courriel: "marie.tremblay@test.com" },
  { prenom: "Julie", nom: "Gagnon", courriel: "julie.gagnon@test.com" },
  { prenom: "Samuel", nom: "Bouchard", courriel: "samuel.bouchard@test.com" },
  { prenom: "Alexandre", nom: "Lefebvre", courriel: "alex.lefebvre@test.com" },
  { prenom: "Camille", nom: "Lavoie", courriel: "camille.lavoie@test.com" },
  { prenom: "Thomas", nom: "Caron", courriel: "thomas.caron@test.com" },
  { prenom: "Sophie", nom: "Martel", courriel: "sophie.martel@test.com" },
  { prenom: "David", nom: "Morin", courriel: "david.morin@test.com" },
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
  { utilisateurId: 1, evenementId: 1 },
  { utilisateurId: 2, evenementId: 1 },
  { utilisateurId: 3, evenementId: 1 },
  { utilisateurId: 4, evenementId: 1 },
  { utilisateurId: 5, evenementId: 1 },

  { utilisateurId: 1, evenementId: 2 },
  { utilisateurId: 6, evenementId: 2 },
  { utilisateurId: 7, evenementId: 2 },
  { utilisateurId: 8, evenementId: 2 },
  { utilisateurId: 9, evenementId: 2 },

  { utilisateurId: 1, evenementId: 3 },
  { utilisateurId: 3, evenementId: 3 },
  { utilisateurId: 5, evenementId: 3 },
  { utilisateurId: 8, evenementId: 3 },
  { utilisateurId: 10, evenementId: 3 },
];

async function afficherResultat(reponse: Response, action: string) {
  const texte = await reponse.text();

  let resultat;

  try {
    resultat = JSON.parse(texte);
  } catch {
    console.log(`❌ ${action} : réponse non JSON`);
    console.log("Status:", reponse.status);
    console.log("Réponse:", texte);
    return;
  }

  if (reponse.ok) {
    console.log(`✅ ${action}`);
  } else {
    console.log(`❌ ${action} : ${resultat.message}`);
  }
}

async function creerUtilisateurs() {
  console.log("Création des utilisateurs...");

  for (const utilisateur of utilisateurs) {
    const reponse = await fetch(`${BASE_URL}/auth/signup`, {
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

    await afficherResultat(
      reponse,
      `Utilisateur ${utilisateur.prenom} ${utilisateur.nom}`
    );
  }
}

async function creerEvenements() {
  console.log("Création des événements...");

  for (const evenement of evenements) {
    const reponse = await fetch(`${BASE_URL}/evenements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evenement),
    });

    await afficherResultat(reponse, `Événement ${evenement.titre}`);
  }
}

async function inscrireUtilisateurs() {
  console.log("Création des files d'attente...");

  for (const inscription of inscriptions) {
    const reponse = await fetch(`${BASE_URL}/file-attente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inscription),
    });

    await afficherResultat(
      reponse,
      `Utilisateur ${inscription.utilisateurId} inscrit à l'événement ${inscription.evenementId}`
    );
  }
}

async function seed() {
  try {
    await viderTables();
    await creerUtilisateurs();
    await creerEvenements();
    await inscrireUtilisateurs();

    console.log("Seed terminé avec succès.");
  } catch (erreur) {
    console.error("Erreur lors du seed :", erreur);
  }
}

seed();