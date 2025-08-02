import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://panchkarma.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to sign in");
        setLoading(false);
        return false;
      }
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      return true;
    } catch {
      setError("Failed to sign in");
      setLoading(false);
      return false;
    }
  };
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    error,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
