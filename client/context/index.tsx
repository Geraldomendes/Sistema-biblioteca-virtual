import { createContext, useState, useEffect } from 'react';
import React from 'react'

import { api } from "../api/index";

interface IContext {
    tokenState: string | null;
    userId: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IContext);

interface AuthProviderContextProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: AuthProviderContextProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    async function login(username: string, password: string) {
        const dados = {
            email: username,
            senha: password,
        };
        try {
            const response = await api.post("/usuarios/login", dados);
            const { token, userId } = response.data as { token: string; userId: string; };
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            localStorage.setItem('token', token);
            setTokenState(token);
            setUserId(userId);
        } catch (error) {
            console.log("Error aqui", error);
        }
    }

    async function logout() {
        setTokenState(null);
        setUserId(null);
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

