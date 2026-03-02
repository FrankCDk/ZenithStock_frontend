import { useAuth } from "../../modules/auth/context/AuthContext";
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box, MenuItem, Menu, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface HeaderProps {
    onMenuToggle: () => void;
}

export const AppBar = ({ onMenuToggle }: HeaderProps) => {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Estado para controlar el menú desplegable (ancla)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfile = () => {
        navigate('/profile'); // Navega a la ruta de perfil (tendrás que crearla)
        handleCloseUserMenu();
    };

    // TODO: Función para cerrar sesión
    const handleLogout = () => {
        logout();
    };

    return (
        <MuiAppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                {/* Botón de Menú para dispositivos móviles */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    ZenithStock | Dashboard
                </Typography>

                {/* =================================================== */}
                {/* SECCIÓN DE USUARIO CON MENÚ DESPLEGABLE */}
                {/* =================================================== */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    {/* 1. Nombre del usuario */}
                    <Typography variant="subtitle1" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
                        Hola, **{user?.name || 'Usuario'}**
                    </Typography>

                    {/* 2. Icono Desplegable */}
                    <Tooltip title="Opciones de cuenta">
                        <IconButton
                            onClick={handleOpenUserMenu}
                            color="inherit"
                            size="large"
                            sx={{ p: 0 }} // Ajustamos el padding del IconButton
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>

                    {/* 3. El Menú Desplegable */}
                    <Menu
                        sx={{ mt: '45px' }} // Posición debajo del icono
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        keepMounted
                    >
                        {/* Opción 1: Perfil/Editar Usuario */}
                        <MenuItem onClick={handleProfile}>
                            <PersonIcon sx={{ mr: 1 }} />
                            <Typography textAlign="center">Perfil</Typography>
                        </MenuItem>

                        {/* Opción 2: Cerrar Sesión */}
                        <MenuItem onClick={handleLogout}>
                            <ExitToAppIcon sx={{ mr: 1 }} />
                            <Typography textAlign="center">Cerrar Sesión</Typography>
                        </MenuItem>

                    </Menu>
                </Box>
                {/* =================================================== */}
            </Toolbar>
        </MuiAppBar>
    );
}
