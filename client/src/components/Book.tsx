import { Button } from '@/components/Button';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/index';

interface BookProps {
    id: string
    title: string;
    author: string;
    year: number;
    editor: string;
    category: string;
    onEmprestimo: (id: string) => void;
    onDelete: (id: string) => void;
    exibirBotao?: boolean;
}

export function Book({
    id,
    title,
    author,
    year,
    editor,
    category,
    onEmprestimo,
    onDelete,
    exibirBotao = true,
}: BookProps) {
    const { category: userCategory } = useAuth();
    return (
        <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 w-full sm:w-auto sm:h-auto">

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
                <span className="font-semibold text-lg text-gray-800">Titulo: {title}</span>
                <span className="text-gray-600">Autor: {author}</span>
                <span className="text-gray-600">Ano: {year}</span>
                <span className="text-gray-600">Editora: {editor}</span>
                <span className="text-gray-600">Categoria: {category}</span>
            </div>

            {exibirBotao && (
                <div className='mt-4 sm:mt-0 sm:ml-4 flex flex-col items-center justify-center'>
                    {userCategory === "servidor" && (
                        <div className='flex items-center justify-center'>
                            <Link to={`/editarlivro/${id}`}>
                                <FaEdit className="text-green-600 text-4xl"></FaEdit>
                            </Link>
                            <FaTrashAlt onClick={() => onDelete(id)} className="text-green-600 text-4xl ml-4"></FaTrashAlt>
                        </div>
                    )}
                    {userCategory === "aluno" && (
                        <Button onClick={() => onEmprestimo(id)} >
                            Realizar Empréstimo
                        </Button>
                    )}
                </div>
            )}
        </div>

    );
}
