import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

interface UserProfileFormData {
    nome: string;
    matricula: string;
    email: string;
    telefone: string;
    curso: string;
    categoria: string;
}

export function EditarPerfil() {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UserProfileFormData>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await api.get('/usuario'); // Supondo que a API retorne os dados do usuário autenticado
                const userData = response.data as UserProfileFormData;

                setValue('nome', userData.nome);
                setValue('matricula', userData.matricula);
                setValue('email', userData.email);
                setValue('telefone', userData.telefone);
                setValue('curso', userData.curso);
                setValue('categoria', userData.categoria);
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [setValue]);

    const onSubmit = async (data: UserProfileFormData) => {
        try {
            await api.put('/usuario', data); // Atualiza os dados do usuário na API
            alert('Dados atualizados com sucesso!');
            navigate('/perfil'); // Redireciona para a página de perfil
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            alert('Erro ao atualizar os dados. Tente novamente.');
        }
    };

    if (loading) {
        return <p>Carregando dados...</p>;
    }

    if (error) {
        return <p className="text-red-500">Erro ao carregar os dados do usuário. Tente novamente mais tarde.</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Editar Perfil</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        {...register('nome', { required: 'O nome é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                </div>

                <div>
                    <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Matrícula</label>
                    <input
                        id="matricula"
                        type="text"
                        {...register('matricula', { required: 'A matrícula é obrigatória' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.matricula && <p className="text-red-500 text-sm">{errors.matricula.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'O e-mail é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        id="telefone"
                        type="text"
                        {...register('telefone', { required: 'O telefone é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
                </div>

                <div>
                    <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso</label>
                    <input
                        id="curso"
                        type="text"
                        {...register('curso', { required: 'O curso é obrigatório' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                    {errors.curso && <p className="text-red-500 text-sm">{errors.curso.message}</p>}
                </div>

                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
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
                    Atualizar Perfil
                </button>
            </form>
        </div>
    );
}
