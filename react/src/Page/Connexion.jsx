import './Style/Connexion.css';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./Style/Error.css"
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from "../axios-client";

const Connexion = () => {
  const [authState, setAuthState] = useState({
    Email: '',
    PassWord: '',
  });
  const { setToken, setUser } = useStateContext();

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const regexConformation = (Email) => {
    const RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return RegexEmail.test(Email);
  };

  const Connections = async (e) => {
    e.preventDefault();
    const { Email, PassWord } = authState;

    try {
      if (Email === '' || PassWord === '' || PassWord.length < 12) {
        setError('Veuillez remplir les champs de connexion.');
      } else if (!regexConformation(Email)) {
        setError('Adresse e-mail invalide.');
      } else {
        setError('');
        const { data } = await axiosClient.post('/auth/login', {
          email: Email,
          password: PassWord,
        });
        setUser(data.user);
        setToken(data.token);
      }
    } catch (e) {
      console.error('Erreur lors de la requête :', e);
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="Connexion">
      <div className="CadreConnexion">
        <form onSubmit={Connections}>
          <h1>Connexion WIZIA</h1>
          <label>
            Mail:
            <input
              type="text"
              name="Email"
              className="Mail"
              value={authState.Email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="PassWord"
              className="Password"
              value={authState.PassWord}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
            />
          </label>
          <div className="links">
            <Link to="/CreateCompte" style={{ color: 'violet', textDecoration: 'none' }}>
              Créer mon compte
            </Link>
            <br />
            <Link to="/PasswordForget" style={{ color: 'blue', textDecoration: 'none' }}>
              Mot de passe oublié
            </Link>
          </div>
          {error && <p className="errorText">{error}</p>}
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
