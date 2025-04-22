import NavBar from "../Components/Retulisatble/NavBar";
import Marronniers from "../Components/Retulisatble/Marronniers";
import CardIA from "../Components/Retulisatble/CardIA";
import { useState } from 'react';
import "./Style/Newletters.css"; 
import { useNavigate } from "react-router-dom";

const Newsletters = () => {
    const [error, setError] = useState("");
    const [generatedPrompt, setGeneratedPrompt] = useState("");
    const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });
    const navigate = useNavigate();
  const [user, setUser] = useState({
    userEmail: '',
    userPassWord: '',
    userAbonnement: '',
    userTravail: '',
  });

  const [Mail, setMail] = useState({
    Email: user.userEmail,
    MailDestinataire: '',
      MailBody: '',
      Date: '',
    Batch : false,
  });


  const AbonnementUser = async () => {
    // Logique à ajouter
    };
    const ListDestinataire = async () => {
        try {  
      navigate('/Dashboard/Newsletters/ListeDestinataireNewsletters');
    } catch (e) {
      console.error('Erreur lors de la navigation :', e);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  
    const ValiderNewsletters = async () => {
        
        
      if (generatedPrompt !== "" && selectedDates !== "") {
      // Logique à ajouter si aujourdui la date on envoie sinon on stock et batch qui envoie a la date 
      
    }
  };

  return (
    <div className="Newsletters">
      <NavBar />
      <div className="NewslettersHeader">
        <h1>Newsletters</h1>
        <button onClick={ListDestinataire}>Liste destinataire</button>
      </div>
        <div className="NewslettersContent">
            <div className="NewslettersIA">
                  <CardIA
                      prompt="le prompte est superregeeeeeeeeeeeeeeeeeeeeeeeee "
                      Titre="Contenu de la Newsletters"
                      onPromptGenerated={setGeneratedPrompt}
                  />
                
            </div>

            <div className="NewslettersBord">
                <Marronniers onDateChange={setSelectedDates} />
            </div>
          </div>
          <div> 
              <button onClick={ValiderNewsletters}>Valider la Newsletters</button>
          </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Newsletters;
