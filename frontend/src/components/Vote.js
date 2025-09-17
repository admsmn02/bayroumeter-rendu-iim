// src/components/Vote.js
import { useState } from "react";
import { sendVote } from "../api";

const Vote = ({ user, onVoteSuccess }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVote = async (choice) => {
    setLoading(true);
    setError("");
    try {
      await sendVote({ userId: user.id, choice }); // user.id doit venir de Login
      onVoteSuccess(); // callback pour mettre à jour les résultats
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du vote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Est-ce que François Bayrou nous manque ?</h2>
      <button onClick={() => handleVote("Oui")} disabled={loading}>
        Oui
      </button>
      <button onClick={() => handleVote("Non")} disabled={loading}>
        Non
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Vote;
