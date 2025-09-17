// src/components/Results.js
import { useEffect, useState } from "react";
import { getVotes } from "../api";

const Results = () => {
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState("");

  const fetchVotes = async () => {
    try {
      const res = await getVotes();
      setVotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des votes");
    }
  };

  useEffect(() => {
    fetchVotes();
    const interval = setInterval(fetchVotes, 5000); // actualisation toutes les 5s
    return () => clearInterval(interval);
  }, []);

  const totalVotes = votes.length;
  const yesVotes = votes.filter((v) => v.choice === "Oui").length;
  const noVotes = votes.filter((v) => v.choice === "Non").length;
  const yesPercent = totalVotes
    ? ((yesVotes / totalVotes) * 100).toFixed(1)
    : 0;
  const noPercent = totalVotes ? ((noVotes / totalVotes) * 100).toFixed(1) : 0;

  return (
    <div>
      <h2>Résultats</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Total votes : {totalVotes}</p>
      <p>
        Oui : {yesVotes} ({yesPercent}%)
      </p>
      <p>
        Non : {noVotes} ({noPercent}%)
      </p>
      <ul>
        {votes.map((v) => (
          <li key={v.id}>
            {v.username} : {v.choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
