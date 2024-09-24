import { useEffect, useState } from 'react';
import { Book } from '../components/Book'; // Componente de livro
import { api } from '../../api/index'; // Requisição para buscar os livros

interface LivroData {
    titulo: string;
    autor: string;
    ano: number;
    editora: string;
    categoria: string;
}

export function Books() {
    const [livros, setLivros] = useState<LivroData[]>([]);

    useEffect(() => {
        async function fetchLivros() {
            try {
                const response = await api.get('/livros'); // Ajuste conforme sua API
                setLivros(response.data);
            } catch (error) {
                console.error('Erro ao buscar os livros', error);
            }
        }

        fetchLivros();
    }, []);

    const handleEmprestimo = (livroTitulo: string) => {
        console.log(`Solicitado empréstimo para o livro: ${livroTitulo}`);
        // Aqui você pode adicionar a lógica de solicitar o empréstimo
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-semibold text-gray-700 mb-8">Livros Disponíveis</h1>

            <div className="space-y-6">
                {livros.map((livro) => (
                    <Book
                        key={livro.titulo}
                        titulo={livro.titulo}
                        autor={livro.autor}
                        ano={livro.ano}
                        editora={livro.editora}
                        categoria={livro.categoria}
                        onEmprestimo={() => handleEmprestimo(livro.titulo)}
                    />
                ))}
            </div>
        </div>
    );
}
