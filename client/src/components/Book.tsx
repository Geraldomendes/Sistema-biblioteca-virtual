import { Button } from '@/components/Button';

interface BookProps {
    id: string
    title: string;
    author: string;
    year: number;
    editor: string;
    category: string;
    onEmprestimo: (id: string) => void;
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
    exibirBotao = true, // Por padrão, exibe o botão de empréstimo
}: BookProps) {
    return (
        <div className="bg-white shadow-lg p-4 rounded-lg flex items-center justify-between mb-8 w-full">
            {/* Informações do livro em linha */}
            <div className="flex gap-8">
                <span className="font-semibold text-lg text-gray-800">Titulo: {title}</span>
                <span className="text-gray-600">Autor: {author}</span>
                <span className="text-gray-600">Ano: {year}</span>
                <span className="text-gray-600">Editora: {editor}</span>
                <span className="text-gray-600">Categoria: {category}</span>
            </div>

            {/* Botão de Empréstimo (se exibirBotao for true) */}
            {exibirBotao && (
                <div className='m-4'>
                    <Button onClick={() => onEmprestimo(id)}>
                        Realizar Empréstimo
                    </Button>
                </div>
            )}
        </div>
    );
}
