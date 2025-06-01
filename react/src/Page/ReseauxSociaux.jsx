import NavBar from "../Components/Retulisatble/NavBar";
import Marronniers from "../Components/Retulisatble/Marronniers";
import CardIA from "../Components/Retulisatble/CardIA";
import { useState } from 'react';
import "./Style/ReseauxSociaux.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../axios-client";

const ReseauxSociaux = () => {

  const [error, setError] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [selectedDates, setSelectedDates] = useState({ startDate: null });
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userAbonnement: '',
    userTravail: '', // pour prompte


  });

  const [Post, setPost] = useState({
    Network: '',
    Bio: '',
    MailBody: '',
    Date: '',
    Batch: false,
  });
  const AbonnementUser = async () => {
    // Logique à ajouter
  };



  const ValiderReseauxSociaux = async () => {



    if (generatedPrompt !== "" && selectedDates.startDate !== null) {

      const today = new Date(); // Manquait ici
      const formatDate = (date) => {
        const years = date.getFullYear();
        const months = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${years}-${months}-${day}`;
      };

      const formattedToday = formatDate(today);
      const formattedSelect = formatDate(new Date(selectedDates.startDate));

      if (new Date(formattedSelect) >= new Date(formattedToday)) {
        try {
          const post = {
            network: 'Facebook',
            post: generatedPrompt,
            date: formattedSelect,
            now: false
          };

          const { data } = await axiosClient.post('/post', post);
          if (data.success) {
            toast.success("Post programmé avec succès");
          } else {
            toast.error("Erreur lors de la programmation de l'évènement");
          }
        } catch (error) {
          console.error("Erreur lors de la programmation :", error);
          toast.error("Erreur lors de la programmation de l'évènement");
        }
      } else {
        toast.error("Vous ne pouvez pas programmer un évènement pour une date passée");
      }

    } else {
      toast.warning("Veuillez générer un prompt et sélectionner une date");
    }
  };

  return (
    <div className="ReseauxSociaux">
      <NavBar />
      <h1>Réseaux Sociaux</h1>
      <div className="ReseauxSociauxContent">
        <div className="ReseauxSociauxIA">
          <CardIA
            prompt="le prompte est superregeeeeeeeeeeeeeeeeeeeeeeeee "
            Titre="Contenu du post sur les Réseaux Sociaux"
            onPromptGenerated={setGeneratedPrompt}
          />
        </div>

        <div className="ReseauxSociauxBord">
          <Marronniers onDateChange={setSelectedDates} />
        </div>
      </div>
      <div>
        <button onClick={ValiderReseauxSociaux}>Publier pour la date sélectionnée</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
};
export default ReseauxSociaux;