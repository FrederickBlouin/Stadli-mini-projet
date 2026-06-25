CREATE TABLE utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    courriel TEXT NOT NULL UNIQUE,
    motDePasse TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evenements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE files_attente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    utilisateurId INTEGER NOT NULL,
    evenementId INTEGER NOT NULL,
    position INTEGER,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id),
    FOREIGN KEY (evenementId) REFERENCES evenements(id),

    UNIQUE(utilisateurId, evenementId)
);