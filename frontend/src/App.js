// src/App.js
import { useState } from "react";
import Login from "./components/Login";
import Vote from "./components/Vote";
import Results from "./components/Results";

function App() {
  const [user, setUser] = useState(null); // stocke l'utilisateur connecté
  const [refresh, setRefresh] = useState(0); // pour rafraîchir les résultats après vote

  const handleVoteSuccess = () => {
    setRefresh((prev) => prev + 1); // déclenche une actualisation des résultats
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🗳️ BayrouMeter</h1>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <p>Bienvenue, {user.pseudo} !</p>
          <Vote user={user} onVoteSuccess={handleVoteSuccess} />
          <Results key={refresh} /> {/* key force le re-render pour refresh */}
        </>
      )}
    </div>
  );
}

export default App;
