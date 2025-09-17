// src/App.js
import { useState } from "react";
import Login from "./components/Login";
import Vote from "./components/Vote";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // stocke l'utilisateur connecté
  const [refresh, setRefresh] = useState(0); // pour rafraîchir les résultats après vote
  const [isRainbow, setIsRainbow] = useState(false);

  const handleVoteSuccess = () => {
    setRefresh((prev) => prev + 1); // déclenche une actualisation des résultats
  };

  const handleTitleClick = () => {
    setIsRainbow(true);
    setTimeout(() => setIsRainbow(false), 2000);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <img
            src="/bayrou.jpeg"
            alt="François Bayrou"
            className="bayrou-avatar"
            onClick={handleTitleClick}
            title="Cliquez sur moi ! 🌈"
          />
          <div>
            <h1
              className={`app-title ${isRainbow ? "rainbow" : ""}`}
              onClick={handleTitleClick}
              title="Cliquez-moi ! 🌈"
            >
              🗳️ BayrouMeter
            </h1>
            <p className="app-subtitle">
              Le baromètre de la nostalgie politique française
            </p>
          </div>
        </div>
      </header>

      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <div className="welcome-message">
            <p>
              🎉 Bienvenue, <strong>{user.pseudo}</strong> !
            </p>
            <p>Votre voix compte dans ce sondage épique</p>
          </div>
          <Vote user={user} onVoteSuccess={handleVoteSuccess} />
          <Results key={refresh} /> {/* key force le re-render pour refresh */}
        </>
      )}
    </div>
  );
}

export default App;
