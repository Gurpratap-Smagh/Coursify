import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

// Add axios interceptor to include token in headers for cross-origin requests
axios.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Check both admin and user endpoints
    const checkAuth = async () => {
      const existingToken = Cookies.get("token");
      
      // If no token exists, user is not logged in
      if (!existingToken) {
        setToken(null);
        setRank(null);
        setLoading(false);
        return;
      }
      
      try {
        // Try user endpoint first
        const res = await axios.get("/users/me", { withCredentials: true });
        // Keep the existing token, just update rank from response
        setToken(existingToken);
        setRank(res.data.rank);
      } catch (errUser) {
        try {
          // If user check fails, try admin endpoint
          const res = await axios.get("/admin/me", { withCredentials: true });
          // Keep the existing token, just update rank from response
          setToken(existingToken);
          setRank(res.data.rank);
        } catch (errAdmin) {
          // Neither endpoint worked → token is invalid, clear auth
          Cookies.remove("token");
          setToken(null);
          setRank(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token, rank) => {
    Cookies.set("token", token, { secure: true, sameSite: 'strict' });
    setToken(token);
    setRank(rank);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setRank(null);
  };

  return (
    <AuthContext.Provider value={{ token, rank, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
