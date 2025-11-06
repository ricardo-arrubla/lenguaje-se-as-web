// sign-lang-frontend/src/components/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <div style={styles.backgroundGradient}></div>
                <div style={styles.content}>
                <div style={styles.badge}>
                    <span style={styles.badgeText}>🎯 Aprende de forma interactiva</span>
                </div>
                <h1 style={styles.title}>
                    Lenguaje de Señas Web <span style={styles.emoji}>🤟</span>
                </h1>
                <p style={styles.subtitle}>
                    Aprende y practica el lenguaje de señas a través de nuestro sistema de reconocimiento basado en visión por computadora
                </p>
                
                <div style={styles.features}>
                    <div style={styles.feature}>
                        <span style={styles.featureIcon}>👁️</span>
                        <span style={styles.featureText}>Reconocimiento en tiempo real</span>
                    </div>
                    <div style={styles.feature}>
                        <span style={styles.featureIcon}>📚</span>
                        <span style={styles.featureText}>Aprende a tu ritmo</span>
                    </div>
                    <div style={styles.feature}>
                        <span style={styles.featureIcon}>✨</span>
                        <span style={styles.featureText}>Retroalimentación instantánea</span>
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <Link to="/register" style={{ ...styles.button, ...styles.registerButton }}>
                        <span style={styles.buttonText}>¡Empieza a Practicar!</span>
                        <span style={styles.buttonArrow}>→</span>
                    </Link>
                    <Link to="/login" style={{ ...styles.button, ...styles.loginButton }}>
                        <span style={styles.buttonText}>Ya tengo cuenta</span>
                    </Link>
                </div>

                <div style={styles.infoCard}>
                    <p style={styles.infoText}>
                        💡 <strong>¿Cómo funciona?</strong> Usa tu cámara web para practicar señas y recibe retroalimentación instantánea de nuestro sistema de IA
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#0a0e27',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
    },
    container: {
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e27',
        overflow: 'hidden',
        paddingTop: '20px',
        paddingBottom: '20px',
        width: '100%',
        margin: '0',
        boxSizing: 'border-box',
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 30%, rgba(97, 218, 251, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    content: {
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '30px 20px',
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        border: '1px solid rgba(97, 218, 251, 0.3)',
        borderRadius: '50px',
        padding: '8px 20px',
        marginBottom: '30px',
    },
    badgeText: {
        color: '#61dafb',
        fontSize: '0.9em',
        fontWeight: '600',
    },
    title: {
        fontSize: '3.5em',
        fontWeight: '800',
        marginBottom: '15px',
        background: 'linear-gradient(135deg, #61dafb 0%, #9333ea 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1.2',
    },
    emoji: {
        display: 'inline-block',
        animation: 'wave 2s ease-in-out infinite',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#a8b2d1',
        marginBottom: '35px',
        lineHeight: '1.6',
        maxWidth: '700px',
        margin: '0 auto 35px',
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
        marginBottom: '50px',
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    featureIcon: {
        fontSize: '1.5em',
    },
    featureText: {
        color: '#e6f1ff',
        fontSize: '0.95em',
        fontWeight: '500',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '40px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 32px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
    },
    registerButton: {
        background: 'linear-gradient(135deg, #61dafb 0%, #4fa8c5 100%)',
        color: '#0a0e27',
        boxShadow: '0 10px 30px rgba(97, 218, 251, 0.3)',
    },
    loginButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#e6f1ff',
        border: '2px solid rgba(97, 218, 251, 0.3)',
    },
    buttonText: {
        position: 'relative',
        zIndex: 1,
    },
    buttonArrow: {
        transition: 'transform 0.3s ease',
    },
    infoCard: {
        backgroundColor: 'rgba(97, 218, 251, 0.08)',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        borderRadius: '16px',
        padding: '20px 30px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    infoText: {
        color: '#a8b2d1',
        fontSize: '1em',
        margin: 0,
        lineHeight: '1.6',
    },
};

export default Home;