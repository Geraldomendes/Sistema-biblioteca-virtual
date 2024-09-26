import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import ifpbLogo from '../assets/ifpb.svg';

import { useAuth } from '../../context/index';

export function Sidebar() {
    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {
        try {
            logout()
            console.log("Logout realizado com sucesso");
            alert('Logout realizado com sucesso!')
            navigate('/login')
        }
        catch (error) {
            console.error('Erro no logout', error);
        }
    }


    return (
        <aside className="bg-green-400 h-screen w-64 flex flex-col items-center py-6">

            <div className="mb-10">
                <img src={ifpbLogo} alt="IFPB Logo" className="w-32" />
            </div>

            <nav className="flex flex-col gap-4 w-full px-4">
                <Button onClick={() => navigate('/home')} >Home</Button>
                <Button onClick={() => navigate('/perfil')} >Perfil</Button>
                <Button onClick={() => navigate('/livros')} >Livros</Button>
                <Button onClick={() => navigate('/emprestimos')} >Empréstimos</Button>
                <Button onClick={() => handleLogout()} >Logout</Button>
            </nav>
        </aside>
    );
}
