import { FaUser, FaBook, FaClipboardList } from 'react-icons/fa'; // Ícones da biblioteca react-icons
import { Sidebar } from '@/components/Sidebar';
import { Link } from 'react-router-dom'; // Importação do Link para navegação

export function Home() {
  return (
    <div className="flex">
      {/* Sidebar na lateral esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-grow p-10">
        <h1 className="text-4xl font-semibold text-gray-700 mb-4">
          Seja bem-vindo à sua Biblioteca Virtual
        </h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-8">
          Aqui você pode:
        </h2>

        {/* Seções com ícones empilhadas verticalmente */}
        <div className="flex flex-col gap-8">
          {/* Perfil */}
          <Link to="/perfil" className="bg-white shadow-lg p-10 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition">
            <FaUser className="text-green-600 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Visualizar e editar seu Perfil
              </h3>
              <p className="text-gray-500">
                Crie seu perfil e atualize seus dados sempre que necessário.
              </p>
            </div>
          </Link>

          {/* Livros disponíveis */}
          <Link to="/livros" className="bg-white shadow-lg p-10 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition">
            <FaBook className="text-green-600 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Conferir os livros disponíveis
              </h3>
              <p className="text-gray-500">
                Verifique os livros disponíveis na biblioteca da instituição.
              </p>
            </div>
          </Link>

          {/* Realizar empréstimos */}
          <Link to="/emprestimos" className="bg-white shadow-lg p-10 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition">
            <FaClipboardList className="text-green-600 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Realizar empréstimos
              </h3>
              <p className="text-gray-500">
                Faça o empréstimo dos livros desejados e depois apenas compareça à
                biblioteca da instituição para fazer a retirada.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
