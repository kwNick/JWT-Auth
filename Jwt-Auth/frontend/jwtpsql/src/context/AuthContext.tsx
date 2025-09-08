"use client";

import { jwtVerify } from "jose";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = {id: number, name: string };
type Shop = {id: number, name: string; location: string; user_id: number };
export type User = {
  username: string;
  email: string;
  password: string;
  roles: Role[];
  shops: Shop[];
};

type AuthContextType = {
  token: string | null;
  role: string[] | null;
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
  const [role, setRole] = useState<string[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from backend, refresh access token if needed
  const fetchProfile = async (overrideToken?: string): Promise<User | null> => {
    if (!API_URL) return null;
    
    const authToken = overrideToken ?? token;
    try {
      let res = await fetch(`http://${API_URL}/api/profile`, {
        credentials: "include", // sends HttpOnly refresh token
        headers: authToken ? { Authorization: `Bearer ${authToken}`} : undefined,
      });

      // If token expired, refresh
      if (res.status == 403) {
        const refreshRes = await fetch(`http://${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // refreshToken cookie
        });
        
        if (!refreshRes.ok) {
          console.log("Logging out due to failed refresh!");
          logout();
          return null;
        }

        const data = await refreshRes.json();

        const { payload }: {payload: {roles: string[], username: String}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
        setRole(payload.roles);
        setToken(data.fullToken);

        // Retry profile fetch with new token
        res = await fetch(`http://${API_URL}/api/profile`, {
          credentials: "include",
          headers: { Authorization: `Bearer ${data.fullToken}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch profile again after refresh.");

      const profileData: User = await res.json();
      
      setUser(profileData);
      return profileData;

    } catch (err) {
      console.error("Failed to fetch Profile: "+err);
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
      
      console.log("data: "+ JSON.stringify(data));

      const { payload }: {payload: {roles: string[], username: String}} = await jwtVerify(data.fullToken, new TextEncoder().encode("secret-key-making-it-very-strong"));
      
      setToken(data.fullToken);
      setRole(payload.roles);

      await fetchProfile(data.fullToken);
      return true;

    } catch (err) {
      console.error("Failed to fetch Login: "+err);
      return false;
    }
    
  };

  // logout function
  const logout = async () => {
    setToken(null);
    setRole(null);
    setUser(null);

    // optionally call backend /auth/logout-refresh to clear refreshToken
    try {
        await fetch(`http://${API_URL}/auth/logout-refresh`, {
        method: "POST",
        credentials: "include", // sets HttpOnly refresh token
      });
    } catch (error) {
        console.error("Logout Request Failed: "+error);
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
    <AuthContext.Provider value={{ token, role, user, loading, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
