import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import ifpbLogo from '../assets/ifpb.svg';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="bg-slate-100 h-screen w-screen flex items-center justify-center gap-20">
      <img src={ifpbLogo} alt="IFPB" width={260} />

      <div className="bg-white px-14 py-8 h-[606px] flex flex-col items-center w-[527px] gap-20 justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">Bem-vindo à</h1>
          <h1 className="text-4xl text-gray-600 font-semibold">
            Biblioteca Virtual
          </h1>
        </div>

        <div className="w-full max-w-80 gap-8 flex flex-col">
          <Button onClick={() => navigate('/login')}>Fazer login</Button>

          <Button onClick={() => navigate('/signup')}>Criar cadastro</Button>
        </div>
      </div>
    </main>
  );
}
