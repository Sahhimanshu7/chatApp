import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const authData = JSON.parse(localStorage.getItem("chat-user"));

  const [currentUser, setCurrentUser] = useState(authData ? authData : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const value = {
    currentUser,
    setCurrentUser,
    error,
    setError,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
