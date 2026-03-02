import type { LoginCredentials } from "../types/LoginCredentials";
import React from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress
} from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';

interface LoginFormProps {
    formData: LoginCredentials;
    isLoading: boolean;
    errors: Partial<LoginCredentials>; // Errores de Zod (opcionales)
    serverError: string | null; // Errores de la API
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({ formData, isLoading, errors, serverError, onChange, onSubmit }: LoginFormProps) => {

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <LockOutlineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
            </Box>

            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={onChange}
                    // Integración de errores de validación de Zod
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={onChange}
                    // Integración de errores de validación de Zod
                    error={!!errors.password}
                    helperText={errors.password}
                />

                {/* Mostrar error del servidor (ej: credenciales incorrectas) */}
                {serverError && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {serverError}
                    </Typography>
                )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isLoading ? 'Conectando...' : 'Entrar'}
                </Button>
            </Box>
        </Paper>
    );


}