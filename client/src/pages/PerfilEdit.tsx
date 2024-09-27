import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/Button';

import { useAuth } from '../../context/index';

interface UserProfileFormData {
    name: string;
    registration: string;
    email: string;
    phone: string;
}

export function PerfilEdit() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfileFormData>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { userId } = useAuth();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await api.get('/user');
                const userData = response.data.user as UserProfileFormData;


                setValue('name', userData.name);
                setValue('registration', userData.registration);
                setValue('email', userData.email);
                setValue('phone', userData.phone);
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);

            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [setValue]);

    const onSubmit = async (data: UserProfileFormData) => {
        console.log(userId)
        console.log(data)
        try {
            await api.put(`/user/${userId}`, data); // Atualiza os dados do usuário na API
            alert('Dados atualizados com sucesso!');
            navigate('/perfil'); // Redireciona para a página de perfil
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            alert('Erro ao atualizar os dados. Tente novamente.');
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <div className="w-full mx-auto p-8 m-14 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">Editar Perfil</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                {...register('name', { required: 'O nome é obrigatório' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Matrícula</label>
                            <input
                                id="matricula"
                                type="text"
                                {...register('registration', { required: 'A matrícula é obrigatória' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                            />
                            {errors.registration && <p className="text-red-500 text-sm">{errors.registration.message}</p>}
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
                                {...register('phone', { required: 'O telefone é obrigatório' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>



                        <Button
                            type="submit"

                        >
                            Atualizar Perfil
                        </Button>
                    </form>
                </div>
            )
            }</div>
    );
}
