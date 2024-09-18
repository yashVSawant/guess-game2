import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const isToken = localStorage.getItem('guessGameToken')?true:false;
  const [ token , setToken] = useState(localStorage.getItem('guessGameToken') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(isToken);

  const login = (getToken) => {
    const bearerToken = `Bearer ${getToken}`
    localStorage.setItem('guessGameToken',bearerToken)
    setToken(bearerToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken('')
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}