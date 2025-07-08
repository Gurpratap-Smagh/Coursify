import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Check both admin and user endpoints
    const checkAuth = async () => {
      try {
        // Try user endpoint first
        const res = await axios.get("/users/me", { withCredentials: true });
        setToken(res.data.token);
        setRank(res.data.rank);
      } catch (errUser) {
        try {
          // If user check fails, try admin endpoint
          const res = await axios.get("/admin/me", { withCredentials: true });
          setToken(res.data.token);
          setRank(res.data.rank);
        } catch (errAdmin) {
          // Neither endpoint worked → not logged in
          setToken(null);
          setRank(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token, rank) => {
    Cookies.set("token", token);
    Cookies.set("rank", rank);
    setToken(token);
    setRank(rank);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("rank");
    setToken(null);
    setRank(null);
  };

  return (
    <AuthContext.Provider value={{ token, rank, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
