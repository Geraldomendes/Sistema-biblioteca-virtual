import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';

interface LivroFormData {
    titulo: string;
    autor: string;
    ano: number;
    editora: string;
    categoria: string;
}

export function EditarLivro() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<LivroFormData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchLivro() {
            try {
                const response = await api.get(`/livros/${id}`);
                const livro = response.data as LivroFormData;

                // Preenche o formulário com os dados do livro
                setValue('titulo', livro.titulo);
                setValue('autor', livro.autor);
                setValue('ano', livro.ano);
                setValue('editora', livro.editora);
                setValue('categoria', livro.categoria);
            } catch (error) {
                console.error('Erro ao carregar o livro:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchLivro();
    }, [id, setValue]);

    const onSubmit = async (data: LivroFormData) => {
        try {
            await api.put(`/livros/${id}`, data);
            alert('Livro atualizado com sucesso!');
            navigate('/livros');
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            alert('Erro ao atualizar o livro. Tente novamente.');
        }
    };

    if (loading) {
        return <p>Carregando dados do livro...</p>;
    }

    if (error) {
        return <p className="text-red-500">Erro ao carregar o livro. Tente novamente mais tarde.</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Editar Livro</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo Título */}
                <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                        Título
                    </label>
                    <input
                        id="titulo"
                        type="text"
                        {...register('titulo', { required: 'O título é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
                </div>

                {/* Campo Autor */}
                <div>
                    <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
                        Autor
                    </label>
                    <input
                        id="autor"
                        type="text"
                        {...register('autor', { required: 'O autor é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.autor && <p className="text-red-500 text-sm">{errors.autor.message}</p>}
                </div>

                {/* Campo Ano */}
                <div>
                    <label htmlFor="ano" className="block text-sm font-medium text-gray-700">
                        Ano de Publicação
                    </label>
                    <input
                        id="ano"
                        type="number"
                        {...register('ano', { required: 'O ano é obrigatório', min: 0 })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.ano && <p className="text-red-500 text-sm">{errors.ano.message}</p>}
                </div>

                {/* Campo Editora */}
                <div>
                    <label htmlFor="editora" className="block text-sm font-medium text-gray-700">
                        Editora
                    </label>
                    <input
                        id="editora"
                        type="text"
                        {...register('editora', { required: 'A editora é obrigatória' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.editora && <p className="text-red-500 text-sm">{errors.editora.message}</p>}
                </div>

                {/* Campo Categoria */}
                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                        Categoria
                    </label>
                    <input
                        id="categoria"
                        type="text"
                        {...register('categoria', { required: 'A categoria é obrigatória' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.categoria && <p className="text-red-500 text-sm">{errors.categoria.message}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-500 transition"
                >
                    Atualizar Livro
                </button>
            </form>
        </div>
    );
}
