import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const baseUrl = "https://learning2.pt-mine.id";
export const AuthProvider = ({ children }) => {
  const handleLogin = async (res) => {
    localStorage.setItem("appuser", JSON.stringify(res));
  };

  const handleLogout = () => {
    localStorage.removeItem("appuser");
    window.location.href = "/login";
  };

  const checkLogin = () => {
    try {
      const token = localStorage.getItem("appuser");
      if (token !== null) {
        const appuser = JSON.parse(token);
        return appuser.email;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ checkLogin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getToken = async () => {
  try {
    const token = localStorage.getItem("appuser");
    if (token !== null) {
      const appuser = JSON.parse(token);
      const bearerToken = "Bearer " + appuser.token;
      return bearerToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
