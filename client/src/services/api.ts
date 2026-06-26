const API_URL = import.meta.env.VITE_API_URL;

export const getEvenements = async () => {
  const reponse = await fetch(`${API_URL}/evenements`);
  return await reponse.json();
};

export const getEvenement = async (evenementId: number) => {
  const reponse = await fetch(`${API_URL}/evenements/${evenementId}`);
  return await reponse.json();
};

export const getNombrePersonnes = async (evenementId: number) => {
  const reponse = await fetch(
    `${API_URL}/file-attente/evenements/${evenementId}/nombre-personnes`
  );
  return await reponse.json();
};