import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

interface UserProfile {
    nome: string;
    matricula: string;
    email: string;
    telefone: string;
    curso: string;
    categoria: string;
}

export function Perfil() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await api.get('/usuario'); // Supondo que a API retorne os dados do usuário autenticado
                setUserData(response.data as UserProfile);
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Carregando dados...</p>;
    }

    if (error) {
        return <p className="text-red-500">Erro ao carregar os dados do usuário. Tente novamente mais tarde.</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Perfil</h1>

            {userData && (
                <div className="space-y-4">
                    <p><strong>Nome:</strong> {userData.nome}</p>
                    <p><strong>Matrícula:</strong> {userData.matricula}</p>
                    <p><strong>E-mail:</strong> {userData.email}</p>
                    <p><strong>Telefone:</strong> {userData.telefone}</p>
                    <p><strong>Curso:</strong> {userData.curso}</p>
                    <p><strong>Categoria:</strong> {userData.categoria}</p>

                    <button
                        onClick={() => navigate('/editar-perfil')}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition"
                    >
                        Editar Cadastro
                    </button>
                </div>
            )}
        </div>
    );
}

