// src/app/dashboard/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  React.useEffect(() => {
    // Redireciona se não autenticado (após terminar o carregamento)
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) return <p className="p-6">Carregando...</p>;
  if (!user) return null; // evita flash enquanto redireciona

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Bem-vindo, {user.login}</p>
      <button
        onClick={logout}
        className="rounded bg-red-600 text-white px-3 py-2"
      >
        Sair
      </button>
    </div>
  );
}
