import React, {useState} from 'react';
import {axiosInstance} from "../../server";
import InputGroup from "../atoms/InputGroup";
import {Link} from "react-router-dom";

export default function AuthForm({action, onTokenAcquisition}) {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [objective, setObjective] = useState(2000);

  return (
    <div className="AuthForm-container">

      <div className="AuthForm">
        <h3>Bienvenue !</h3>
        {action === 'register' && (
          <>
            <div className="AuthForm__field">
              <label className="AuthForm__label">
                Objectif
              </label>
              <InputGroup
                type="text"
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                className="AuthForm__input"
                icon="user"
                placeholder="Entrez votre petit nom"
              />
            </div>
          </>
        )}
        <div className="AuthForm__field">
          <label className="AuthForm__label">
            Nom d'utilisateur
          </label>
          <InputGroup
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="AuthForm__input"
            icon="envelope"
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div className="AuthForm__field">
          <label className="AuthForm__label">
            Mot de passe
          </label>
          <InputGroup
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="AuthForm__input"
            icon="lock"
            isIconSolid
            placeholder="Mot de passe"
          />
        </div>
        <button onClick={sendData} className="AuthForm__action">
          {action === 'register' ? "S'enregistrer" : 'Se connecter'}
        </button>
        {action === "register" && (
          <div className="AuthForm__redirection">
            <p>Vous avez déjà un compte ?</p>
            <Link to="/login">Connectez-vous</Link>
          </div>
        )}
        {action === "login" && (
          <div className="AuthForm__redirection">
            <p>Vous n'avez pas de compte ?</p>
            <Link to="/register">Créez un compte</Link>
          </div>
        )}

        <div className="AuthForm__redirection">
          <Link to="/">Retourner à l'accueil</Link>
        </div>
      </div>
    </div>
  );

  function sendData() {
    if (action === 'register') {
      axiosInstance.post('/user/register', {
        password,
        username,
        objective,
      }).then(({data}) => {
        const token = data.token;
        if (token) {
          onTokenAcquisition(token, true);
        } else if (data.message) {
        }
      });
    } else if (action === 'login') {
      axiosInstance.post('/user/login', {
        username,
        password,
      }).then(({data}) => {
        const token = data.token;
        console.log(token);
        if (token) {
          onTokenAcquisition(token, true);
        } else if (data.error) {
        }
      });
    }
  }
}
