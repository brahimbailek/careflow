import { createContext, useState } from 'react';
import axiosInstance from './api/client';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ?? '');

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      setAuthToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
    } catch (error) {
      console.error(`Failed to login ${error}`);
    }
  };

  const logout = () => {
    setAuthToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;