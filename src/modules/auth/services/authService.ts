import type { LoginCredentials } from "../types/LoginCredentials";
import type { AuthResponse } from "../types/AuthResponse";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_AUTH_URL;

export const authService = {

    async Login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {

            const response = await axios.post(`${API_URL}/Auth/login`, credentials);
            return response.data.data;

        } catch (error) {
            // Manejo de errores de red o del servidor
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Error al iniciar sesión.');
            }
            throw new Error('No se pudo conectar con el servidor.');
        }
    }


}