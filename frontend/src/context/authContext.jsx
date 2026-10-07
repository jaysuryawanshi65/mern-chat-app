import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(Cookies.get("authToken")));

  const checkAuth = () => setIsAuthenticated(Boolean(Cookies.get("authToken")));
  const setAuthenticated = value => setIsAuthenticated(value);
  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, checkAuth, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
