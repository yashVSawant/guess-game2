import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const isToken = localStorage.getItem('GameToken')?true:false;
  const [ token , setToken] = useState(localStorage.getItem('GameToken') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(isToken);

  const login = (getToken) => {
    const bearerToken = `Bearer ${getToken}`
    localStorage.setItem('GameToken',bearerToken)
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