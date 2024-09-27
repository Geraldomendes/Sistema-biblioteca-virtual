import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/Button';
import { useAuth } from '../../context/index';

interface UserProfile {
    id: string;
    name: string;
    registration: string;
    email: string;
    phone: string;
    category: string;
}

export function Perfil() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const { userId } = useAuth();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await api.get('/user'); // Chamada para buscar dados do usuário autenticado
                console.log(response.data.user)
                setUserData(response.data.user as UserProfile);

            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    async function handleDelete() {
        try {
            console.log(userId)
            await api.delete(`/user/${userId}`); // Envia o ID do usuário

            alert('Conta deletada com sucesso!');
            localStorage.removeItem('token');
            navigate('/signup'); // Redireciona para a página de cadastro

        } catch (error) {
            console.error('Erro ao deletar a conta:', error);
            alert('Erro ao deletar a conta. Tente novamente.');
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex items-center justify-center gap-8 bg-gray-100">
                {loading ? (
                    <p>Carregando dados...</p>
                ) : error || !userData ? (
                    <p className="text-red-500 text-3xl font-semibold">Usuário não encontrado</p>
                ) : (
                    <div className="max-w-3xl w-full p-12 gap-10 bg-white rounded-xl shadow-lg text-gray-700">
                        <h1 className="text-4xl font-bold mb-8 text-center">Perfil</h1>

                        <div className="grid grid-cols-1 gap-10 text-xl">
                            <p><strong>Nome:</strong> {userData.name}</p>
                            <p><strong>Matrícula:</strong> {userData.registration}</p>
                            <p><strong>E-mail:</strong> {userData.email}</p>
                            <p><strong>Telefone:</strong> {userData.phone}</p>
                            <p><strong>Categoria:</strong> {userData.category}</p>
                        </div>

                        <div className="flex justify-center mt-8 p-6 gap-6">
                            <Button
                                onClick={() => navigate('/editarperfil')}
                            >
                                Editar Cadastro
                            </Button>
                            <Button
                                onClick={handleDelete}
                            >
                                Apagar Cadastro
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

