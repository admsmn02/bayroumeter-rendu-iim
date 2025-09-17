// src/components/Results.js
import { useEffect, useState } from "react";
import { getVotes } from "../api";
import VoteChart from "./VoteChart";

const Results = () => {
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVotes = async () => {
    try {
      const res = await getVotes();
      setVotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des votes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
    const interval = setInterval(() => {
      fetchVotes();
    }, 5000); // actualisation toutes les 5s
    return () => clearInterval(interval);
  }, []);

  const totalVotes = votes.length;
  const yesVotes = votes.filter((v) => v.choice === "Oui").length;
  const noVotes = votes.filter((v) => v.choice === "Non").length;
  const yesPercent = totalVotes
    ? ((yesVotes / totalVotes) * 100).toFixed(1)
    : 0;
  const noPercent = totalVotes ? ((noVotes / totalVotes) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            className="loading-spinner"
            style={{ width: "40px", height: "40px", margin: "0 auto 1rem" }}
          ></div>
          <p>Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      {/* Interactive Chart */}
      <VoteChart yesVotes={yesVotes} noVotes={noVotes} chartType="doughnut" />

      <div className="card">
        <h2>📊 Résultats en temps réel</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="results-stats">
          <div className="stat-card total-votes">
            <div className="stat-number">{totalVotes}</div>
            <div className="stat-label">Total Votes</div>
          </div>

          <div className="stat-card yes-votes">
            <div className="stat-number">{yesVotes}</div>
            <div className="stat-label">Oui ({yesPercent}%)</div>
          </div>

          <div className="stat-card no-votes">
            <div className="stat-number">{noVotes}</div>
            <div className="stat-label">Non ({noPercent}%)</div>
          </div>
        </div>

        {/* Visual Progress Bars */}
        {totalVotes > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "600", color: "#48bb78" }}>
                  👍 OUI
                </span>
                <span style={{ fontWeight: "600", color: "#48bb78" }}>
                  {yesPercent}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${yesPercent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #48bb78, #38a169)",
                    transition: "width 0.5s ease",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "600", color: "#f56565" }}>
                  👎 NON
                </span>
                <span style={{ fontWeight: "600", color: "#f56565" }}>
                  {noPercent}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${noPercent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #f56565, #e53e3e)",
                    transition: "width 0.5s ease",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {votes.length > 0 && (
        <div className="vote-list">
          <h3>🗳️ Historique des votes</h3>
          {votes
            .slice(-10)
            .reverse()
            .map((v) => (
              <div key={v.id} className="vote-item">
                <span className="vote-username">{v.username}</span>
                <span
                  className={`vote-choice ${
                    v.choice.toLowerCase() === "oui" ? "yes" : "no"
                  }`}
                >
                  {v.choice === "Oui" ? "👍 Oui" : "👎 Non"}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Results;
