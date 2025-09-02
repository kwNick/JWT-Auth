"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = { name: string };
type Shop = { name: string; location: string; user_id: string };
export type User = {
  username: string;
  email: string;
  password: string;
  roles: Role[];
  shops: Shop[];
};

type AuthContextType = {
  token: string | null;
  roleToken: string | null;
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchProfile: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_JWT_AUTH_API_DOMAIN;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [roleToken, setRoleToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from backend, refresh access token if needed
  const fetchProfile = async (): Promise<User | null> => {
    if (!API_URL) return null;
    
    console.log("token: "+token);
    try {
      let res = await fetch(`http://${API_URL}/api/profile`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });

        if (!refreshRes.ok) {
          logout();
          return null;
        }

        const data = await refreshRes.json();
        setToken(data.token);
        setRoleToken(data.roleToken);

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/api/profile`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.token}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch profile");

      const profileData: User = await res.json();
      setUser(profileData);
      return profileData;
    } catch (err) {
      console.error("Failed to fetch Login: "+err);
      logout();
      return null;
    }
  };

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`http://${API_URL}/auth/login-refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // sets HttpOnly refresh token
      });

      if (!res.ok) return false;

      const data = await res.json();
      // console.log("data"+ JSON.stringify(data));

      setToken(data.token);
      setRoleToken(data.roleToken);
      console.log("token: "+token);
      await fetchProfile();
      return true;
    } catch (err) {
      console.error("Failed to fetch Login: "+err);
      return false;
    }
  };

  // logout function
  const logout = async () => {
    setToken(null);
    setRoleToken(null);
    setUser(null);
    // optionally call backend /auth/logout to clear refreshToken
    try {
        const res = await fetch(`http://${API_URL}/auth/logout-refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sets HttpOnly refresh token
      });
    } catch (error) {
        console.error("Failed to fetch logout: "+error);
    }
  };

  // On mount, attempt to refresh access token automatically
  useEffect(() => {
    (async () => {
      await fetchProfile();
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ token, roleToken, user, loading, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
