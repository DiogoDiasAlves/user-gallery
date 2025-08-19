"use client";
import { useAuth } from "@/context/AuthContext";
import { Form } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login as apiLogin } from "@/models/auth";
import * as React from "react";

export default function LoginPage() {
  const router = useRouter();
  
  const [loginValue, setLoginValue] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const loginMutation = useMutation({
    mutationFn: async ({ login, password }: { login: string; password: string }) => {
      await apiLogin({ login, password });
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Credenciais inválidas');
    },
  });

  const handleLogin = async () => {
    if (!loginValue || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setError('');
    loginMutation.mutate({ login: loginValue, password });
  };
  return (
    <div className="flex h-screen relative">
      <div className="flex-1 relative">
        <Image
          src="/imageLogin.jpg"
          alt="imagem de login"
          width={1096}
          height={980}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="w-[824px] h-screen bg-gray-100 flex justify-center items-center">
        <Form className="w-[392px] h-[281px] border border-gray-300 rounded-[8px] p-6 flex flex-col justify-center items-start gap-4">
          <h3 className="mb-1 font-bold text-lg text-black">Entrar</h3>
          {error && (
            <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <Input 
            type="text"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            className="w-full h-[30px] text-black border-2 border-gray-300 rounded-md" 
            placeholder="Digite seu usuário" 
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[30px] text-black border-2 border-gray-300 rounded-md" 
            placeholder="Digite sua senha" 
          />
          <Button 
            onClick={handleLogin} 
            disabled={loginMutation.isPending}
            className="self-center bg-[#008FFF] text-white rounded-[6px] px-[20px] py-[10px] hover:bg-[#0077e6] disabled:opacity-50"
          >
            {loginMutation.isPending ? 'Entrando...' : 'Acessar a plataforma'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
