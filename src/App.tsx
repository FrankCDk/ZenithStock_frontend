import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importamos el Proveedor de Autenticación
import { AuthProvider } from './modules/auth/context/AuthContext';
// Importamos la página de login
import { LoginPage } from './modules/auth/pages/LoginPage';
// Importamos el guardia de rutas
import { PrivateLayout } from './shared/layouts/PrivateLayout';
import { CategoriesPage } from './modules/categories/pages/CategoriesPage';

// Componentes Simulación para Rutas Privadas
const DashboardPage = () => <h1>Bienvenido al Dashboard</h1>;
const ProductsPage = () => <h1>Inventario de Productos</h1>;

function App() {
  return (
    // 1. BrowserRouter: Necesario para que las rutas funcionen
    <BrowserRouter>
      {/* 2. AuthProvider: Envuelve todas las rutas para que el token sea global */}
      <AuthProvider>
        <Routes>

          {/* =================================================== */}
          {/* 1. RUTAS PÚBLICAS (No necesitan AuthProvider, solo Login/Register) */}
          {/* =================================================== */}
          <Route path="/login" element={<LoginPage />} />

          {/* =================================================== */}
          {/* 2. RUTAS PRIVADAS (Envueltas por el PrivateLayout Guard) */}
          {/* =================================================== */}
          <Route element={<PrivateLayout />}>
            {/* Si el usuario no está logueado, PrivateLayout lo redirigirá a /login */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/masters/categories" element={<CategoriesPage />} />
            <Route path="/" element={<DashboardPage />} /> {/* Ruta por defecto */}
          </Route>

          {/* 3. Ruta de Not Found (404) */}
          <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;