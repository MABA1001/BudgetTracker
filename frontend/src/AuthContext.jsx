import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  const removeAuthToken = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, removeAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
