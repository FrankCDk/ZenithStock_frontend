import { Navigate, Outlet } from 'react-router-dom';
import { Box, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../../modules/auth/context/AuthContext';
import { AppBar } from '../components/AppBar';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';

const drawerWidth = 240;

export const PrivateLayout = () => {

    const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
    const theme = useTheme();

    // Hook para saber si estamos en un tamaño de pantalla pequeño (sm o menos)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Estado para manejar si el Sidebar está abierto en móvil
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // 1. Lógica de Guardia: si NO está autenticado, redirigir al login
    if (!isAuthenticated) {
        // El 'replace' asegura que el usuario no pueda volver a la página privada con el botón 'atrás'
        return <Navigate to="/login" replace />;
    }

    // 2. Si está autenticado, muestra el contenido de la ruta solicitada
    return (
        <Box sx={{ display: 'flex' }}>

            {/* 1. APP BAR (Menú Superior) */}
            <AppBar onMenuToggle={handleDrawerToggle} />

            {/* 2. SIDEBAR (Menú Lateral) - Lo manejamos con dos variantes para Desktop/Mobile */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Variante Móvil: Es temporal (se cierra al hacer clic) */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }} // Rendimiento móvil
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                >
                    <Sidebar />
                </Drawer>

                {/* Variante Escritorio: Es permanente */}
                <Drawer
                    variant="permanent"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    open
                >
                    <Sidebar />
                </Drawer>
            </Box>

            {/* 3. CONTENIDO PRINCIPAL (Donde se cargan las páginas: Dashboard, Productos, etc.) */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar /> {/* Esto compensa la altura de la AppBar fija */}
                <Outlet /> {/* Aquí se renderiza la página actual */}
            </Box>
        </Box>
    );
};


