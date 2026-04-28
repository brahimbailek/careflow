import React, { createContext } from "react"
import { useEffect } from 'react';

export const AuthContext = createContext({});
const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8012'

function AuthProvider({ children }) {
  const authState = {
    isAuthenticated: false,
    token: "",
    refreshToken: "",
    user: null
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setAuthenticated(true);
    }
  }, [])

  function setToken(token) {
    localStorage.setItem("access_token", token)
  }

  function setUser(user) {
    authState.user = user;
    window.localStorage.setItem("user_info", JSON.stringify(user))
  }

  async function attemptLogin() {    
    try {
      const response = await BACKEND_CLIENT.post(`/token/refresh`, { refresh: localStorage.getItem('refresh_token') })
      setToken(response.data.access);
      setUser({username: 'demo'});
    } catch (e) {
      alert(e.message)
      window.localStorage.removeItem("access_token");
      window.location.href = "/login"
    }
  }

  const authenticateUser = token => {
    authState.isAuthenticated = true;
    authState.token = token.accessToken;  
    setToken(token.access);
    setUser(JSON.parse(window.localStorage.getItem("user_info")));
  }

  function logout() {      
    localStorage.removeItem('access_token')
    window.location.href="/login"
  }

  return (
    <AuthContext.Provider
      value={authState}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;