
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}

// The provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign in (real API call)
  const signin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
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

  // Sign out
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
