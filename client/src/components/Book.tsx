import { Button } from '@/components/Button'; // Componente de botão que você já criou

interface LivroProps {
    titulo: string;
    autor: string;
    ano: number;
    editora: string;
    categoria: string;
    onEmprestimo?: () => void; // Função opcional para o botão de empréstimo
    exibirBotao?: boolean; // Controla se o botão de empréstimo será exibido
}

export function Book({
    titulo,
    autor,
    ano,
    editora,
    categoria,
    onEmprestimo,
    exibirBotao = true, // Por padrão, exibe o botão de empréstimo
}: LivroProps) {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col gap-4 mb-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{titulo}</h3>
                <p className="text-gray-600">Autor: {autor}</p>
                <p className="text-gray-600">Ano: {ano}</p>
                <p className="text-gray-600">Editora: {editora}</p>
                <p className="text-gray-600">Categoria: {categoria}</p>
            </div>

            {exibirBotao && (
                <Button onClick={onEmprestimo} className="self-end">
                    Realizar Empréstimo
                </Button>
            )}
        </div>
    );
}
