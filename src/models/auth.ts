// src/services/auth.ts
import api from "@/app/(config)/(http)/axios";

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
  message: string;
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
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/me");
  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>("/auth/logout");
  return data;
}
