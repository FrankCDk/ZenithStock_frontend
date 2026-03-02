import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        // Definimos el color primario (ej: el color principal de tu marca)
        primary: {
            main: '#1976d2', // Un azul corporativo para acciones principales
        },
        // Definimos un color secundario (para acciones de acento)
        secondary: {
            main: '#dc004e',
        },
        // Añadimos el color de fondo para la aplicación
        background: {
            default: '#f4f6f8', // Un gris claro, común en dashboards
        },
        success: {
            // Tonalidad principal de tu nuevo verde
            main: '#388e3c', // Un verde esmeralda o bosque más fuerte
            // Tonalidad más clara para contrastes o backgrounds
            light: '#6abf69',
            // Tonalidad más oscura para hover o bordes
            dark: '#00600f',
            contrastText: '#fff', // Texto blanco para asegurar legibilidad
        },

    }, typography: {
        // Definimos la fuente predeterminada
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    // Aquí puedes añadir más overrides para botones, tablas, etc.
    components: {
        MuiButton: {
            defaultProps: {
                // Hacemos que todos los botones sean elevados por defecto
                disableElevation: true,
            }
        }
    }
});