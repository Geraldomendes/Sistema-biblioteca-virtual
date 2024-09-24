import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import ifpbLogo from '../assets/ifpb.svg';

export function Sidebar() {
    const navigate = useNavigate();

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
                <Button onClick={() => navigate('/logout')} >Logout</Button>
            </nav>
        </aside>
    );
}
