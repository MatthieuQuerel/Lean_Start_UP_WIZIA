import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosClient from "../axios-client";

const Google_Analytics = () => {
    const [error, setError] = useState('');
    const [rating, setRating] = useState(null);
    const navigate = useNavigate();

    const AjouterGoogleAnalytics = () => {
        try {
            navigate("/Dashboard/Google_Analytics/AddGoogle_Analytics")
        } catch (e) {
            setError("imposible de changé de page")
        }
    }

    const fetchRating = async (placeId, apiKey) => {
        try {
            const { data } = await axiosClient.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating&key=${apiKey}`);

            if (data.result && data.result.rating) {
                setRating(data.result.rating);
            } else {
                console.log('Aucune note trouvée.');
            }
        } catch (error) {
            console.error('Error fetching rating:', error);
        }
    };

    return (
        <div className="Google_Analytics">
            <h2>Google Analytics</h2>
            <button onClick={AjouterGoogleAnalytics}>ajouter un Google Analytics</button>
            {/* {rating !== null && (
                <div>
                    <p>⭐ {rating} / 5</p>
                </div>
            )} */}
        </div>
    );
};

export default Google_Analytics;
