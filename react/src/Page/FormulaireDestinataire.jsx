import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Style/FormulaireDestinataire.css";

const FormulaireDestinataire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const destinataire = location.state || { nom: "", prenom: "", email: "" };

  const [formData, setFormData] = useState({
    nom: destinataire.nom,
    prenom: destinataire.prenom,
    email: destinataire.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire validé :", formData);
    // Ajouter ou modifier dans la base / API ici
    navigate("/Dashboard/Newsletters/ListeDestinataireNewsletters");
  };

  return (
    <div className="FormulaireDestinataire">
      <h2>{destinataire?.id ? "Modifier le destinataire" : "Ajouter un destinataire"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
        </label>
        <label>
          Prénom :
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
        </label>
        <label>
          Email :
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">💾 Enregistrer</button>
        <button type="button" onClick={() => navigate("/Dashboard/Newsletters/ListeDestinataireNewsletters")}>❌ Annuler</button>
      </form>
    </div>
  );
};

export default FormulaireDestinataire;
