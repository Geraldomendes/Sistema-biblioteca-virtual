import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../src/pages/Home';
import { Perfil } from '../src/pages/Perfil';
import { Books } from '../src/pages/Books';
import { Loans } from '@/pages/Loans';



export function PrivateRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/livros" element={<Books />} />
                <Route path="/emprestimos" element={<Loans />} />
            </Routes>
        </BrowserRouter>
    );
}