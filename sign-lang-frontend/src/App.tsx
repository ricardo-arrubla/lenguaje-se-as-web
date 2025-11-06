// sign-lang-frontend/src/App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Componentes que ya tienes
import Home from './components/Home'; // Nuevo componente Home
import Register from './components/Register'; // Componente de Registro
import Login from './components/Login'; // Componente de Login
import SignRecognition from './components/SignRecognition'; // Componente de la cámara/práctica

const App = () => {
    // Resetear estilos globales
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'auto';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
    }, []);

    return (
        <Router>
            <div style={appStyles.wrapper}>
                <Header /> {/* Barra de navegación */}
                <Routes>
                    {/* Ruta de inicio */}
                    <Route path="/" element={<Home />} /> 
                    {/* Rutas de autenticación */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* Ruta de la funcionalidad principal */}
                    <Route path="/practice" element={<SignRecognition />} /> 
                    
                    {/* Puedes añadir una ruta para un 404 si quieres */}
                    <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

// Componente simple para la barra de navegación
const Header = () => {
    return (
        <header style={headerStyles.header}>
            <Link to="/" style={headerStyles.logo}>
                <span style={headerStyles.logoIcon}>🤟</span> LSC Trainer
            </Link>
            <nav style={headerStyles.nav}>
                <Link to="/practice" style={headerStyles.navLink}>Practicar</Link>
                <Link to="/register" style={headerStyles.navLink}>Registro</Link>
                <Link to="/login" style={headerStyles.navLink}>Login</Link>
            </nav>
        </header>
    );
};

const appStyles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        width: '100%',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
    }
};

const headerStyles: { [key: string]: React.CSSProperties } = {
    header: {
        backgroundColor: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '18px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(97, 218, 251, 0.1)',
        position: 'sticky',
        top: '0',
        zIndex: 1000,
        width: '100%',
        boxSizing: 'border-box',
    },
    logo: {
        color: 'white',
        fontSize: '1.6em',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'color 0.3s',
    },
    logoIcon: {
        fontSize: '1.2em',
    },
    nav: {
        display: 'flex',
        gap: '30px',
    },
    navLink: {
        color: '#a8b2d1',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: '500',
        transition: 'color 0.3s',
        position: 'relative',
        padding: '5px 0',
    }
};

export default App;