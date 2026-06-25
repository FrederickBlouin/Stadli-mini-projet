INSERT INTO evenements (titre, description, date)
VALUES
('Festival d''été', 'Concerts extérieurs au centre-ville.', '2026-07-10 20:00:00'),
('Salon du jeu vidéo', 'Découverte des nouveautés gaming.', '2026-09-15 09:30:00'),
('Conférence React', 'Journée de conférences sur React et le développement Web.', '2026-10-21 08:30:00');

INSERT INTO files_attente (utilisateurId, evenementId, position)
VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),

(1, 2, 1),
(6, 2, 2),
(7, 2, 3),
(8, 2, 4),
(9, 2, 5),

(1, 3, 1),
(3, 3, 2),
(5, 3, 3),
(8, 3, 4),
(10, 3, 5);