"use client";
import "@/app/globals.css"; 
import { Button } from "@heroui/react";
import Togle from "./togle";
import { useRouter } from "next/navigation";




export default function Header() {
const router = useRouter();

const gotToLogin = () => {
  router.push('/login');
};

  return (
 <header className="bg-gallery-background p-4 flex justify-between items-center ">
      <div className="mb-30">
        <h1 className="text-[rgba(199,199,199,1)] text-4xl font-bold">Gallery</h1>
      </div>
      <div>
        <h1 className="text-[rgba(199,199,199,1)] text-2xl font-bold">Tabela</h1>
      </div>
      <div>
        <Button onClick={gotToLogin}
        size="md"
        className=" border-1 border-gray-200 bg-[rgba(199,199,199,1)] hover:bg-[rgba(246,63,96,1)] hover:text-white rounded-lg mb-20 ">Encerrar sessão</Button>
        <Togle>
        </Togle>
      </div>
    </header>
  );
}





