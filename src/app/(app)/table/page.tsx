"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue
} from "@heroui/react";
import { Button } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/(config)/(http)/axios";
import { ImagesProps } from "@/models/images";
import { Eye, Trash } from "lucide-react";
import { queryClient } from "@/app/(config)/(http)/react-query";
import Header from "@/_components/header";


const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Nome" },
    { key: "stored", label: "Arquivo" },
    { key: "size", label: "Tamanho" },
    { key: "created", label: "Data de Criação" },
    { key: "actions", label: "Ações" }
];


export default function TableComponent2() {

    const { data } = useQuery({
        queryKey: ['table'],
        queryFn: async () => {
            try {
                const { data } = await api.get<ImagesProps[]>('/image')
                return data
            } catch (error) {
                console.error(error);
            }

        },
     
    })
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: number) => {
          await api.delete(`/image/${id}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['table'] });
        },
      });
      
      const handleDelete = (id: number) => {
        mutation.mutate(id);
      };

      const mutationView = useMutation({
        mutationFn: async(id: number) => {
            await api.get(`/image/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['table'] });
        },
      });
      const handleView = (id: number) => {
        mutationView.mutate(id);
      };


    return (
        <>   <Header></Header>
            <div className="flex justify-end mb-2 mr-10"><Button className="bg-blue-500 text-white rounded-lg">Upload de imagem</Button></div>
            <Table aria-label="Tabela estilizada" removeWrapper className="min-w-full"
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            className="bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800"
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody>

                    <>

                        {data?.map((props: ImagesProps) => (

                            <TableRow>

                                <TableCell className="text-center bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800">{props.id_image}</TableCell>

                                <TableCell className="text-center bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800">{props.nm_image}</TableCell>

                                <TableCell className="text-center bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800">{props.vl_size_kb}</TableCell>

                                <TableCell className="text-center bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800">{props.nm_stored}</TableCell>

                                <TableCell className="text-center bg-gray-200 border-b border-gray-300 px-4 py-2 text-center font-semibold text-gray-800">{props.dt_created}</TableCell>

                                <TableCell className="flex gap-2 justify-center">        <Button
                                    isIconOnly
                                    size="sm"
                                    className="bg-blue-500 text-white rounded-md"
                                    onClick={() => handleView(props.id_image)}
                                >
                                    <Eye size={16} />
                                </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        className="bg-red-500 text-white rounded-md"
                                        onClick={() => handleDelete(props.id_image)}
                                    >
                                        <Trash size={16} />
                                    </Button></TableCell>




                            </TableRow>

                        ))}

                    </>
                </TableBody>
            </Table>
        </>
    );
}
