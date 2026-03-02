import { useState } from "react"
import { LoginSchema, type LoginCredentials } from "../types/LoginCredentials"
import { useNavigate } from "react-router-dom"
import { Container } from "@mui/material"
import { LoginForm } from "../components/LoginForm"
import { useAuth } from "../context/AuthContext"
import { ZodError, z } from 'zod';

const initialFormData: LoginCredentials = { email: '', password: '' }

export const LoginPage = () => {

    const [formData, setFormData] = useState<LoginCredentials>(initialFormData)
    const [serverError, setServerError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Estado para los errores de validación del formulario (Zod)
    const [validationErrors, setValidationErrors] = useState<Partial<LoginCredentials>>({})

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Si ya está autenticado, redirigir inmediatamente
    if (isAuthenticated) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


        event.preventDefault();
        setServerError(null);
        setValidationErrors({});
        setIsLoading(true);

        try {

            // 1. VALIDACIÓN CON ZOD (El Por Qué: Previene llamadas a la API innecesarias)
            LoginSchema.parse(formData);

            // 2. LLAMADA A LA API
            await login(formData);

            // 3. Redirección (manejará el AuthProvider)
            navigate('/dashboard', { replace: true });

        } catch (error) {

            if (error instanceof ZodError) {

                // 1. SOLUCIÓN AL ERROR 2339: Usamos 'as ZodError' para asegurar a TypeScript que
                // la variable 'error' es un ZodError y podemos acceder a su propiedad '.errors'.
                const zodError = error as ZodError;

                // 2. SOLUCIÓN AL ERROR 7006: Tipamos explícitamente el parámetro del forEach 
                // con el tipo 'z.ZodIssue' que Zod exporta.
                const fieldErrors: Partial<LoginCredentials> = {};

                zodError.issues.forEach((err: z.ZodIssue) => { // <-- Tipado explícito aquí
                    // Aseguramos que path[0] es una clave de LoginCredentials
                    fieldErrors[err.path[0] as keyof LoginCredentials] = err.message;
                });
                setValidationErrors(fieldErrors);

            } else if (error instanceof Error) {
                // 5. Manejo de Errores de la API (Backend)
                setServerError(error.message);
            } else {
                setServerError('Ocurrió un error inesperado.');
            }


        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh'
            }}
        >
            <LoginForm
                formData={formData}
                isLoading={isLoading}
                errors={validationErrors}
                serverError={serverError}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Container>
    )
}