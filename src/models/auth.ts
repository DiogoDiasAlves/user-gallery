// src/services/auth.ts
import api from "@/app/(config)/(http)/axios";
import Cookies from 'js-cookie';

export type User = {
  id: number | string;
  login: string;
  name?: string | null;
  [key: string]: unknown;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token_access: string;
};

export type MeResponse = {
  message: string;
  user: User;
};

export type LogoutResponse = {
  message: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  
  // Armazena o token nos cookies com configurações seguras
  if (data.token_access) {
    Cookies.set('token_access', data.token_access, {
      expires: 7, // Expira em 7 dias
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      sameSite: 'lax', // Proteção CSRF
      path: '/' // Disponível em toda a aplicação
    });
  }
  
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/me");
  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>("/auth/logout");
  
  // Remove o token dos cookies
  Cookies.remove('token_access', { path: '/' });
  
  return data;
}
