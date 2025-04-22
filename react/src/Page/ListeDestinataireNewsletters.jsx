import React, { useState } from "react";
import "./Style/ListeDestinataireNewsletters.css";
import { useNavigate } from "react-router-dom";

const ListeDestinataireNewsletters = () => {
  const navigate = useNavigate();
  const [destinataires, setDestinataires] = useState([
    { id: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com" },
    { id: 2, nom: "Durand", prenom: "Claire", email: "claire.durand@email.com" },
  ]);

  const handleDelete = (id) => {
    setDestinataires(prev => prev.filter(d => d.id !== id));
  };

  const handleEditAdd = (destinataire = null) => {
    // Si destinataire est null => ajout, sinon modification
    navigate("/Dashboard/Newsletters/ListeDestinataireNewsletters/FormulaireDestinataire", {
      state: destinataire,
    });
  };

  const onClosed = () => {
    navigate("/Dashboard/Newsletters");
  };

  return (
    <div className="ListeDestinataireNewsletters">
      <h2>Liste des destinataires</h2>

      <div className="ListeButtons">
        <button onClick={() => handleEditAdd(null)}>➕ Ajouter un destinataire</button>
        <button onClick={onClosed}>❌ Fermer</button>
      </div>

      <br />

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {destinataires.map((dest) => (
            <tr key={dest.id}>
              <td>{dest.nom}</td>
              <td>{dest.prenom}</td>
              <td>{dest.email}</td>
              <td>
                <button onClick={() => handleEditAdd(dest)}>✏️</button>
              </td>
              <td>
                <button onClick={() => handleDelete(dest.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeDestinataireNewsletters;
