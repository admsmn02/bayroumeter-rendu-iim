// src/components/Vote.js
import { useState } from "react";
import { sendVote } from "../api";
import Confetti from "./Confetti";

const Vote = ({ user, onVoteSuccess }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = async (choice) => {
    setLoading(true);
    setError("");
    try {
      await sendVote({ userId: user.id, choice }); // user.id doit venir de Login
      setHasVoted(true);
      setShowConfetti(true); // Trigger confetti animation
      onVoteSuccess(); // callback pour mettre à jour les résultats

      // Reset the voted state after 3 seconds to allow voting again
      setTimeout(() => setHasVoted(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du vote");
    } finally {
      setLoading(false);
    }
  };

  if (hasVoted) {
    return (
      <div className="card">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <img
              src="/bayrou.jpeg"
              alt="François Bayrou"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #48bb78",
                animation: "bounce 1s infinite",
                boxShadow: "0 10px 25px rgba(72, 187, 120, 0.3)",
              }}
            />
          </div>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ color: "#48bb78", marginBottom: "1rem" }}>
            Vote enregistré !
          </h2>
          <p style={{ color: "#718096" }}>
            Merci pour votre participation à ce sondage démocratique
          </p>
          <p
            style={{
              color: "#667eea",
              fontSize: "0.9rem",
              marginTop: "1rem",
              fontStyle: "italic",
            }}
          >
            "Votre voix compte !" - François Bayrou
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🤔 Est-ce que François Bayrou nous manque ?</h2>
      <p
        style={{ textAlign: "center", color: "#718096", marginBottom: "1rem" }}
      >
        Une question existentielle qui divise la France
      </p>

      <div className="vote-container">
        <button
          onClick={() => handleVote("Oui")}
          disabled={loading}
          className="btn-vote btn-yes"
        >
          {loading ? <span className="loading-spinner"></span> : "👍"}
          <br />
          <strong>OUI</strong>
          <br />
          <small>Il nous manque</small>
        </button>

        <button
          onClick={() => handleVote("Non")}
          disabled={loading}
          className="btn-vote btn-no"
        >
          {loading ? <span className="loading-spinner"></span> : "👎"}
          <br />
          <strong>NON</strong>
          <br />
          <small>On s'en passe</small>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
    </div>
  );
};

export default Vote;
