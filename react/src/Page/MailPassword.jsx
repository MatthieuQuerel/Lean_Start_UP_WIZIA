import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/PasswordForget.css";
import axiosClient from "../axios-client";

const MailPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post('/auth/password/forget', formData);
      setMessage("Le mot de passe a été mis à jour avec succès.");
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
        <h2>Réinitialiser le mot de passe</h2>

        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Nouveau mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Mettre à jour</button>
        {message && <p className="infoText">{message}</p>}
      </form>
    </div>
  );
};

export default MailPassword;
