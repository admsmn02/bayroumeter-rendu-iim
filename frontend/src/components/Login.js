// src/components/Login.js
import { useState } from "react";
import { createUser } from "../api";

const Login = ({ setUser }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo || !email) {
      setError("Pseudo et email obligatoires");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createUser({ pseudo, email });
      setUser(res.data); // stocke l'utilisateur dans App
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>👋 Identifiez-vous</h2>
      <p
        style={{ textAlign: "center", color: "#718096", marginBottom: "2rem" }}
      >
        Rejoignez la communauté et exprimez votre opinion !
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Votre pseudo génial"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="votre.email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <span className="loading-spinner"></span>}
          {loading ? "Connexion..." : "🚀 Se connecter"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
