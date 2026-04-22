import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchProfile, loginUser, registerUser } from "../services/authApi";

const AuthContext = createContext(null);

const storageKey = "pulsekeep_auth";

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch (_error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.token) {
      setToken(stored.token);
      setUser(stored.user || null);
    }
    setLoading(false);
  }, []);

  const persistAuth = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(storageKey, JSON.stringify({ token: nextToken, user: nextUser }));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(storageKey);
  };

  const login = async (payload) => {
    const data = await loginUser(payload);
    persistAuth(data.token, data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    persistAuth(data.token, data.user);
    return data;
  };

  const refreshProfile = async () => {
    if (!token) {
      return;
    }

    const data = await fetchProfile();
    persistAuth(token, data.user);
  };

  useEffect(() => {
    if (token) {
      refreshProfile().catch(() => {
        clearAuth();
      });
    }
  }, [token]);

  useEffect(() => {
    const handleLogout = () => {
      clearAuth();
    };

    window.addEventListener("pulsekeep:logout", handleLogout);
    return () => window.removeEventListener("pulsekeep:logout", handleLogout);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, register, refreshProfile, logout: clearAuth }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
