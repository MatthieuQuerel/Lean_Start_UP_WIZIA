import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/AddGoogleAnalytics.css";

const AddGoogleAnalytics = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomClient: "",
    siret: "",
    email: "",
    objectif: "",
  });
const onClosed = () => {
    navigate("/Google_Analytics");
  };
  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({...prev,[name]:value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Infos client GA :", formData);
    
    navigate("/Dashboard/Google_Analytics");
  };

  return (
    <div className="AddGoogleAnalytics">
  <div className="CadreAddGoogleAnalytics">
    <h2>Configurer Google Analytics pour un client</h2>
    <button className="closeButton" onClick={onClosed}>❌</button>
    <form onSubmit={handleSubmit}>
        <label>Nom du client :</label>
        <input type="text" name="nomClient" value={formData.nomClient} onChange={handleChange} required />

        <label>Numéro de SIRET :</label>
        <input type="text" name="siret" value={formData.siret} onChange={handleChange} required />

        <label>Email de contact :</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
    </div>
  );
};

export default AddGoogleAnalytics;
