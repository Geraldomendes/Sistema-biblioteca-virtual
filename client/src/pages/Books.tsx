import { useEffect, useState } from 'react';
import { Book } from '../components/Book';
import { api } from '../../api/index';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '../../context';

export interface LivroData {
    id: string;
    title: string;
    author: string;
    year: number;
    editor: string;
    category: string;
}

interface LoanData {
    userId: string;
    bookId: string;
}

export function Books() {
    const [livros, setLivros] = useState<LivroData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { userId } = useAuth();

    useEffect(() => {
        async function fetchLivros() {
            try {
                const response = await api.get('/books');
                console.log(response.data)
                setLivros(response.data);
            } catch (error) {
                console.error('Erro ao carregar os dados dos livros:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchLivros();
    }, []);

    async function handleEmprestimo(livroId: string) {
        console.log(`Solicitado empréstimo para o livro: ${livroId}`);

        const novoEmprestimo: LoanData = {
            bookId: livroId,
            userId: userId,
        };
        console.log(novoEmprestimo)
        try {
            const response = await api.post('/lend', novoEmprestimo);
            console.log(response.data)
            alert("Livro emprestado com sucesso")
        } catch (error) {
            console.error('Erro ao fazer emprestimo:', error);
        }
        ;
    }

    return (
        <div className="flex">

            <Sidebar />
            <div className="p-10">
                <h1 className="text-4xl font-semibold text-gray-700 mb-8">Livros Disponíveis</h1>
                {loading ? (
                    <p>Carregando dados...</p>
                ) : error || !livros ? (
                    <p className="text-red-500 text-2xl font-semibold">Livros não encontrados</p>
                ) : (
                    <div className="space-y-6">
                        {livros.map((livro) => (
                            <Book
                                id={livro.id}
                                key={livro.id}
                                title={livro.title}
                                author={livro.author}
                                year={livro.year}
                                editor={livro.editor}
                                category={livro.category}
                                onEmprestimo={() => handleEmprestimo(livro.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
