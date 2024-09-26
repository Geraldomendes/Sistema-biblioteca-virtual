import { useEffect, useState } from 'react';
import { Book } from '../components/Book';
import { api } from '../../api';
import { Sidebar } from '@/components/Sidebar';
import { LivroData } from './Books';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EmprestimoData {
    loanDate: string;
    returnDate: string;
    book: LivroData;
}

export function Loans() {
    const [emprestimos, setEmprestimos] = useState<EmprestimoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchLivrosEmprestados() {
            try {
                const response = await api.get('/lendings');
                if (response.data.length === 0) {
                    setError(true);
                } else {
                    setEmprestimos(response.data.lends);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchLivrosEmprestados();
    }, []);

    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col  p-10 bg-gray-100">
                <h1 className="text-4xl font-semibold text-gray-700 mb-8">Livros Emprestados</h1>

                {loading ? (
                    <p className="text-xl text-gray-600">Carregando dados...</p>
                ) : error || emprestimos.length === 0 ? (
                    <p className="text-red-500 text-3xl font-semibold">Livros não encontrados</p>
                ) : (
                    <div className="w-full max-w-4xl space-y-6">
                        {emprestimos.map(({ loanDate, returnDate, book: livro }) => (
                            <div className='flex flex-row gap-4'>
                                <div className='bg-green-400'>
                                    <p>Empréstimo em: {format(new Date(loanDate), 'PP', { locale: ptBR })} </p>
                                    <p>Devolução em: {format(new Date(returnDate), 'PP', { locale: ptBR })} </p>
                                </div>
                                <Book
                                    id={livro.id}
                                    key={livro.id}
                                    title={livro.title}
                                    author={livro.author}
                                    year={livro.year}
                                    editor={livro.editor}
                                    category={livro.category}
                                    exibirBotao={false} // Não exibe o botão de empréstimo
                                    onEmprestimo={() => { }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
