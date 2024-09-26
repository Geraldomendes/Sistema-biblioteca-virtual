import { createContext, useState, useEffect, useContext } from 'react';
import React from 'react'

import { api } from "../api/index";

type User = {
    id: string;
}

interface IContext {
    tokenState: string | null;
    userId: string;
    login: (registration: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IContext);

interface AuthProviderContextProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: AuthProviderContextProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");

    async function login(registration: string, password: string) {
        const dados = {
            registration: registration,
            password: password,
        };
        try {

            const response = await api.post("/signin", dados);

            const { token, user } = response.data as { token: string; user: User; };

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            localStorage.setItem('token', token);
            setTokenState(token);
            setUserId(user.id);
        } catch (error) {
            console.log("Error aqui", error);
        }
    }

    async function logout() {
        setTokenState(null);
        setUserId("");
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

    }

    useEffect(() => {
        async function loadStorage() {
            const tokenStorage = localStorage.getItem('token');
            if (tokenStorage) {
                api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                setTokenState(tokenStorage);
            }
        }
        loadStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const contexto = useContext(AuthContext);

    return contexto;
}

