"use client";
import {Button, ButtonGroup} from "@heroui/react";
import { FileImage,AlignJustify } from 'lucide-react';
import { useRouter } from "next/navigation";
export default function Togle() {

    const router = useRouter();

    const goToCarousel = () => {
     router.push('/carrossel');
    };
 
    const goToTable = () => {
     router.push('/table');
    };

  return (
    <ButtonGroup>
      <Button onClick={goToCarousel} 
      className="border-1 border-gray-200 hover:bg-[#dbd8d8] hover:text-white rounded-lg"
      variant="bordered"
      startContent={<FileImage size={25} color = "blue" />}></Button>
      <Button onClick={goToTable}
      className="border-1 border-gray-200 hover:bg-[#dbd8d8] hover:text-white rounded-lg"
      variant="bordered"
      startContent={<AlignJustify size={25} color = "gray" />}></Button>
    </ButtonGroup>
  );
}


