// src/components/Login.js
import { useState } from "react";
import { createUser } from "../api";

const Login = ({ setUser }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo || !email) {
      setError("Pseudo et email obligatoires");
      return;
    }

    try {
      const res = await createUser({ pseudo, email });
      setUser(res.data); // stocke l'utilisateur dans App
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div>
      <h2>Identifiez-vous</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
