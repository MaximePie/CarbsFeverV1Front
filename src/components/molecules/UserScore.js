import React from 'react';
import {axiosInstance} from "../../server";

export default function UserScore({onLogout, user, onReset}) {
  const {username, objective, current} = user;
  return (
    <div className="UserScore">
      <div>
        <button onClick={onLogout}>Se déconnecter</button>
        <h4>Bonjour {username}</h4>
        <p>Objectif : {objective}</p>
        <p>Restant : {objective - current}</p>
        <button onClick={resetProgress}>Réinitialiser</button>
      </div>
    </div>
  );

  /**
   * Resets the current counter
   */
  function resetProgress() {
    axiosInstance.get('user/current/reset').then(() => onReset())
  }
}
