import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import useLocalStorage from './hooks/useLocalStorage';

import "./App.css";
import Navigation from './routes-nav/Navigation';
import NavRoutes from './routes-nav/NavRoutes';
import UserContext from './auth/UserContext';
import JoblyApi from './api/api';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]))
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          
          // Fetch the current user and applied jobs
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          
          // Update applicationIds with the IDs from currentUser
          if (currentUser.applications && Array.isArray(currentUser.applications)) {
            setApplicationIds(new Set(currentUser.applications));
          } else {
            setApplicationIds(new Set());
          }

        } catch (err) {
          console.error("Error loading user data", err);
          setCurrentUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    getCurrentUser();
  }, [token]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, error };
    }
  }

  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("Signup failed", error);
      return { success: false, error };
    }
  }



  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  async function applyToJob(id) {
    if(hasAppliedToJob(id)) return;
     await JoblyApi.applyToJob(currentUser.username, id);
     setApplicationIds(new Set([...applicationIds, id]))
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
          <Navigation logout={logout} />
          <NavRoutes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
