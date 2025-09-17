import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7071/api",
});

// Créer un utilisateur
export const createUser = (user) => api.post("/user", user);

// Envoyer un vote
export const sendVote = (vote) => api.post("/vote", vote);

// Récupérer tous les votes
export const getVotes = () => api.get("/votes");
