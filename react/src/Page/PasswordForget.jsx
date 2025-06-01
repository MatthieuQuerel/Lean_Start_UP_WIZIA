import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/PasswordForget.css";
import axiosClient from "../axios-client";

const PasswordForget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post('auth/password/forget', { email });
      setMessage("Un email de réinitialisation a été envoyé.");
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Une erreur s'est produite.");
    }
  };

  const onClosed = () => {
    navigate("/");
  };

  return (
    <div className="PasswordForget">
      <button className="closeButton" onClick={onClosed}>❌</button>
      <form onSubmit={handleSubmit}>
        <h2>Mot de passe oublié</h2>

        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Réinitialiser</button>
        {message && <p className="infoText">{message}</p>}
      </form>
    </div>
  );
};

export default PasswordForget;
