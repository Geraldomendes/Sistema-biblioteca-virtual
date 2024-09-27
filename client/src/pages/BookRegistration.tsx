import { useForm } from 'react-hook-form';
import { api } from '../../api';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/Button';

interface LivroFormData {
    title: string;
    author: string;
    year: number;
    editor: string;
    category: string;
}

export function BookRegistration() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LivroFormData>();

    const onSubmit = async (data: LivroFormData) => {
        try {

            console.log(data)
            await api.post('/books', data);
            alert('Livro cadastrado com sucesso!');
            reset(); // Reseta os campos do formulário após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar o livro:', error);
            alert('Erro ao cadastrar o livro. Tente novamente.');
        }
    };

    return (
        <div className="flex">

            <Sidebar />
            <div className="flex-grow w-full mx-auto p-8 m-14 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Cadastro de Livro</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Campo Título */}
                    <div>
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                            Título
                        </label>
                        <input
                            id="titulo"
                            type="text"
                            {...register('title', { required: 'O título é obrigatório' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Campo Autor */}
                    <div>
                        <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
                            Autor
                        </label>
                        <input
                            id="autor"
                            type="text"
                            {...register('author', { required: 'O autor é obrigatório' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        />
                        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                    </div>

                    {/* Campo Ano */}
                    <div>
                        <label htmlFor="ano" className="block text-sm font-medium text-gray-700">
                            Ano de Publicação
                        </label>
                        <input
                            id="ano"
                            type="number"
                            {...register('year', { required: 'O ano é obrigatório', min: 0 })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        />
                        {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                    </div>

                    {/* Campo Editora */}
                    <div>
                        <label htmlFor="editora" className="block text-sm font-medium text-gray-700">
                            Editora
                        </label>
                        <input
                            id="editora"
                            type="text"
                            {...register('editor', { required: 'A editora é obrigatória' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        />
                        {errors.editor && <p className="text-red-500 text-sm">{errors.editor.message}</p>}
                    </div>

                    {/* Campo Categoria */}
                    <div>
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                            Categoria
                        </label>
                        <input
                            id="categoria"
                            type="text"
                            {...register('category', { required: 'A categoria é obrigatória' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <Button
                        type="submit"

                    >
                        Cadastrar Livro
                    </Button>
                </form>
            </div>
        </div>
    );
}
