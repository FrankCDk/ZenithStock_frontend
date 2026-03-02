import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types/LoginCredentials';

// 1. Definimos la Interfaz para el Contexto
interface AuthContextType {
    token: string | null;
    user: any; // Debería ser una interfaz de User real
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. El Proveedor de Autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem('jwt_token'));
    const [user, setUser] = useState<any>(null); // Datos del usuario

    useEffect(() => {
        // Aquí podrías añadir lógica para validar si el token es válido o refrescarlo
        if (token) {
            // Idealmente, decodificamos el token o hacemos una llamada para obtener el user
            // Por ahora, simplemente decimos que está autenticado si hay token
            setUser({ name: 'Usuario' });
        } else {
            setUser(null);
        }

    }, [token]);

    const login = async (credentials: LoginCredentials) => {

        const { token, email } = await authService.Login(credentials);

        console.log(token);
        console.log(email);

        // Almacenamiento (Atención: usar Cookies HTTP-Only es más seguro)
        localStorage.setItem('jwt_token', token);
        setToken(token);
        setUser(email);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Hook Personalizado (El Cómo profesional)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};