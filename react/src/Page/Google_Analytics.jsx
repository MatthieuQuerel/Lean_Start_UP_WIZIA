import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const Google_Analytics = () => {
 const [error,setError] = useState('')
  const navigate = useNavigate();
    const AjouterGoogleAnalytics = () => {
        try {
            navigate("/Dashboard/Google_Analytics/AddGoogle_Analytics")
        } catch (e) {
            setError("imposible de changé de page")
        }
     
 }
  return (
    <div className="Google_Analytics">
      <h2>Google Analytics</h2>
      <button onClick={AjouterGoogleAnalytics}>ajouter un Google Analytics</button>
    </div>
  );
};

export default Google_Analytics;
