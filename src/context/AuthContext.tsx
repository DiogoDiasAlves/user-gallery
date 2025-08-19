// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as apiLogin, logout as apiLogout, type User } from "@/models/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega sessão na montagem
  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const data = await getMe();
        if (mounted) setUser(data.user);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    bootstrap();

    // Ouve 401 do interceptor e derruba sessão
    const onUnauthorized = () => setUser(null);
    document.addEventListener("unauthorized", onUnauthorized);

    return () => {
      mounted = false;
      document.removeEventListener("unauthorized", onUnauthorized);
    };
  }, []);

  const login = async (login: string, password: string) => {
    await apiLogin({ login, password });
    const data = await getMe();
    setUser(data.user);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const value: AuthContextType = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}
