// sign-lang-frontend/src/components/Register.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService'; 
// Asume que authService está en '../services/authService'

function Register() {
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Para deshabilitar el botón durante la carga

    // Maneja los cambios en los inputs y actualiza el estado
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            await registerUser(formData);
            setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
            // Opcional: Limpiar el formulario o redirigir al login
            setFormData({
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: '',
            });

        } catch (error) {
            // Muestra el mensaje de error detallado del backend
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backgroundGradient}></div>
            
            <div style={styles.registerCard}>
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <span style={styles.icon}>✨</span>
                    </div>
                    <h2 style={styles.title}>Crea tu cuenta</h2>
                    <p style={styles.subtitle}>Únete y comienza a aprender lenguaje de señas</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.rowInputs}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nombre</label>
                            <input 
                                type="text" 
                                name="first_name" 
                                placeholder="Tu nombre" 
                                value={formData.first_name} 
                                onChange={handleChange} 
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Apellido</label>
                            <input 
                                type="text" 
                                name="last_name" 
                                placeholder="Tu apellido" 
                                value={formData.last_name} 
                                onChange={handleChange} 
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Usuario *</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Elige un nombre de usuario" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Correo Electrónico *</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="tu@email.com" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Contraseña *</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Mínimo 8 caracteres" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            style={styles.input}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{
                            ...styles.button,
                            ...(isLoading ? styles.buttonDisabled : {})
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span style={styles.spinner}>⏳</span>
                                <span>Registrando...</span>
                            </>
                        ) : (
                            <>
                                <span>Crear Cuenta</span>
                                <span style={styles.buttonArrow}>→</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Muestra el mensaje de éxito o error */}
                {message && (
                    <div style={{
                        ...styles.message,
                        ...(message.startsWith('Error') ? styles.messageError : styles.messageSuccess)
                    }}>
                        <span style={styles.messageIcon}>
                            {message.startsWith('Error') ? '❌' : '✅'}
                        </span>
                        <span>{message}</span>
                    </div>
                )}

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" style={styles.link}>
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e27',
        padding: '40px 20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(97, 218, 251, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    registerCard: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '550px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(97, 218, 251, 0.1)',
        border: '1px solid rgba(97, 218, 251, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '35px',
    },
    iconContainer: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70px',
        height: '70px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(97, 218, 251, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
        border: '1px solid rgba(97, 218, 251, 0.3)',
        marginBottom: '20px',
    },
    icon: {
        fontSize: '2em',
    },
    title: {
        fontSize: '2em',
        fontWeight: '700',
        color: '#e6f1ff',
        marginBottom: '10px',
        margin: '0 0 10px 0',
    },
    subtitle: {
        fontSize: '1em',
        color: '#a8b2d1',
        margin: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    rowInputs: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.9em',
        fontWeight: '600',
        color: '#e6f1ff',
    },
    input: {
        padding: '14px 16px',
        fontSize: '1em',
        borderRadius: '12px',
        border: '2px solid rgba(97, 218, 251, 0.2)',
        backgroundColor: 'rgba(10, 14, 39, 0.5)',
        color: '#e6f1ff',
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px',
        fontSize: '1.1em',
        fontWeight: '700',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(135deg, #61dafb 0%, #4fa8c5 100%)',
        color: '#0a0e27',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: '10px',
        boxShadow: '0 10px 30px rgba(97, 218, 251, 0.3)',
    },
    buttonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
    buttonArrow: {
        transition: 'transform 0.3s ease',
    },
    spinner: {
        display: 'inline-block',
        animation: 'spin 1s linear infinite',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 18px',
        borderRadius: '12px',
        fontSize: '0.95em',
        marginTop: '20px',
        fontWeight: '500',
    },
    messageSuccess: {
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#86efac',
    },
    messageError: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#fca5a5',
    },
    messageIcon: {
        fontSize: '1.2em',
    },
    footer: {
        marginTop: '30px',
        paddingTop: '25px',
        borderTop: '1px solid rgba(97, 218, 251, 0.1)',
        textAlign: 'center',
    },
    footerText: {
        color: '#a8b2d1',
        fontSize: '0.95em',
        margin: 0,
    },
    link: {
        color: '#61dafb',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'color 0.3s ease',
    },
};

export default Register;