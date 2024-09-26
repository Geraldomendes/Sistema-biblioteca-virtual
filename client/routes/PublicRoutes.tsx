import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Welcome } from '../src/pages/Welcome';
import { Login } from '../src/pages/Login';
import { Signup } from '../src/pages/Signup';


export function PublicRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Welcome />} />
                <Route path="/welcome" element={< Welcome />} />
                < Route path="/signup" element={< Signup />} />
                < Route path="/login" element={< Login />} />
            </Routes>
        </BrowserRouter>
    )
}