import './App.css';
import UserScore from "./components/molecules/UserScore"
import Ingredients from "./components/molecules/Ingredients"
import AuthenticationForm from "./components/molecules/AuthenticationForm"
import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import {axiosInstance, setAuthToken} from "./server";
import handleError from "./services/errors";


function App() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkIfUserIsAuthed()
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {!isLoading && (
          <Switch>
            <Route path="/login">
              <AuthenticationForm action={"login"} onTokenAcquisition={getUserWithToken}/>
            </Route>
            <Route path="/register">
              <AuthenticationForm action={"register"} onTokenAcquisition={getUserWithToken}/>
            </Route>
            {user && (
              <Route path='/' exact>
                <UserScore onLogout={logout} user={user} onReset={getUserWithToken}/>
                <Ingredients onCarbsUpdate={(updatedUser) => setUser(updatedUser)}/>
              </Route>
            )}
            {!user && (
              <Route path='/' exact>
                <Link to="/login">Se connecter</Link>
              </Route>
            )}
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );

  /**
   * Removes users authentication token,
   * Then deletes user information
   * Then redirects to Home page
   */
  function logout() {
    localStorage.removeItem('auth-token');
    setAuthToken(null);
    setUser(undefined);
  }

  function getUserWithToken(token = localStorage.getItem('auth-token'), isAfterLogging = false) {
    localStorage.setItem('auth-token', token);
    setAuthToken(token);
    axiosInstance.get('/user/connectedUser').then((user) => {
      setLoading(false);
      setUser(user.data.user);
      if (isAfterLogging) {
        document.location.replace('/');
      }
    }).catch(handleError)
  }

  function checkIfUserIsAuthed() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      getUserWithToken(token);
    } else {
      setLoading(false);
    }
  }
}

export default App;
