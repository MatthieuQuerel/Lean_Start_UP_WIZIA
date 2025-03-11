import "./Style/Error.css"
const Error =() => {
return(
<div className="error-container">
    <h1 className="error-title">Oops! Page non trouvée.</h1>
    <p className="error-message">URL que vous avez demandée existe pas.</p>
    <a href="/" className="error-link">Retour sur l accueil</a>
</div>
)
};
export default Error;