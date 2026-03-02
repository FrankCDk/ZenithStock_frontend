import React, { useState } from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Collapse, // Nuevo para la animación
    Box       // Nuevo para el scroll
} from '@mui/material';
import { NavLink } from 'react-router-dom';
// Importa iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLess from '@mui/icons-material/ExpandLess'; // Icono para contraer
import ExpandMore from '@mui/icons-material/ExpandMore'; // Icono para expandir
import SettingsIcon from '@mui/icons-material/Settings'; // Icono para Configuración

const drawerWidth = 240;

// Definición de Tipos para la Navegación (Buena Práctica)
interface NavItem {
    text: string;
    icon: React.ReactNode;
    path?: string;
    type: 'link' | 'collapse';
    name?: string; // Nombre único para el estado del colapso
    children?: NavItem[];
}

// 1. Definición de las opciones del menú con jerarquía
const navItems: NavItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', type: 'link' },
    { text: 'Productos', icon: <InventoryIcon />, path: '/products', type: 'link' },

    // Ejemplo de Submenú Colapsable (Configuración)
    {
        text: 'Datos Maestros',
        icon: <SettingsIcon />, // Mantenemos el ícono de configuración, ya que es la configuración de los datos
        type: 'collapse',
        name: 'master_data', // Nueva clave única
        children: [
            // Configuración de Artículos
            { text: 'Unidades de Medida', icon: <></>, path: '/masters/units', type: 'link' },
            { text: 'Categorías', icon: <></>, path: '/masters/categories', type: 'link' },
            // Otras estructuras de datos del negocio
            { text: 'Proveedores', icon: <></>, path: '/masters/vendors', type: 'link' },
            { text: 'Almacenes', icon: <></>, path: '/masters/warehouses', type: 'link' },
        ]
    },

    { text: 'Usuarios', icon: <PeopleIcon />, path: '/users', type: 'link' },

    // Más elementos para demostrar el scroll (opcional)
    { text: 'Reporte Mensual', icon: <DashboardIcon />, path: '/reports/monthly', type: 'link' },
    { text: 'Reporte Anual', icon: <DashboardIcon />, path: '/reports/yearly', type: 'link' },
    { text: 'Stock Mínimo', icon: <DashboardIcon />, path: '/stock/min', type: 'link' },
    { text: 'Movimientos', icon: <DashboardIcon />, path: '/inventory/moves', type: 'link' },
];

export const Sidebar = () => {
    // 2. Estado para el Acordeón: Guarda la clave única (name) del menú abierto
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    // 3. Lógica de Toggle y Acordeón
    const handleCollapseToggle = (name: string) => {
        // Si el menú clicado es el que ya está abierto, lo cerramos (null).
        // Si no, abrimos el nuevo (name). Esto asegura que solo uno esté abierto.
        setOpenMenu(prevName => (prevName === name ? null : name));
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                // AÑADIDO: Configuración para scroll en el papel del Drawer
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    // Importante: El scroll debe ir en el contenedor de la lista, no aquí.
                    // Aquí solo aseguramos el ancho.
                },
            }}
        >
            <Toolbar> {/* 4. Toolbar fija el título */}
                <Typography variant="h6" noWrap component="div">
                    ZenithStock
                </Typography>
            </Toolbar>
            <Divider />

            {/* 5. Contenedor Scrollable: overflowY: 'auto' permite el scroll vertical */}
            <Box sx={{ overflowY: 'auto' }}>
                <List>
                    {navItems.map((item) => (
                        <React.Fragment key={item.text}>
                            {item.type === 'link' && item.path ? (
                                // A) Opción de Enlace Normal
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={NavLink}
                                        to={item.path}
                                        // Estilo para la ruta activa (MUI)
                                        sx={{
                                            '&.active': {
                                                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                                '& .MuiListItemIcon-root': { color: 'primary.main' },
                                                '& .MuiListItemText-primary': { fontWeight: 'bold' }
                                            }
                                        }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ) : (
                                // B) Opción de Colapso (Header del Submenú)
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => handleCollapseToggle(item.name!)}>
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                            {/* Icono de expansión/contracción basado en el estado */}
                                            {openMenu === item.name ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                    </ListItem>

                                    {/* Cuerpo Colapsable del Submenú */}
                                    <Collapse in={openMenu === item.name} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children?.map((subItem) => (
                                                <ListItem key={subItem.text} disablePadding>
                                                    <ListItemButton
                                                        component={NavLink}
                                                        to={subItem.path!}
                                                        sx={{
                                                            pl: 4, // 6. Indentación para sub-items
                                                            '&.active': {
                                                                backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                                                '& .MuiListItemText-primary': { fontWeight: 'bold' }
                                                            }
                                                        }}
                                                    >
                                                        <ListItemText primary={subItem.text} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};