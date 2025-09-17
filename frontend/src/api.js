import axios from "axios";

const api = axios.create({
  baseURL: "https://lively-pond-070636e10.2.azurestaticapps.net/api", // <- pointe vers tes fonctions locales
});

// Créer un utilisateur
export const createUser = (user) => api.post("/user", user);

// Envoyer un vote
export const sendVote = (vote) => api.post("/vote", vote);

// Récupérer tous les votes
export const getVotes = () => api.get("/votes");
