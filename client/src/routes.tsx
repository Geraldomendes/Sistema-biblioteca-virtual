import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { Books } from './pages/Books';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}
