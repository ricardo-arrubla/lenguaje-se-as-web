// sign-lang-frontend/src/components/SignRecognition.tsx

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
//
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

// Importamos tfjs para el modelo de IA
import * as tf from '@tensorflow/tfjs'; 

// Las predicciones deben ser de un tipo conocido
type Prediction = { 
    className: string;
    probability: number;
};

const SignRecognition: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<tf.LayersModel | null>(null); // Referencia para tu modelo de IA
    const [status, setStatus] = useState("Cargando modelo y MediaPipe...");
    const [prediction, setPrediction] = useState<Prediction>({ className: 'Ninguna', probability: 0 });

    // --- FUNCIONES DE INICIALIZACIÓN ---

    // 1. Función para cargar el modelo de TensorFlow.js (¡MUY IMPORTANTE!)
    const loadTensorFlowModel = async () => {
        try {
            // Usa window.location.origin para asegurar la URL base
            const modelUrl = `${window.location.origin}/models/model.json`; 
            // O déjalo como estaba si el cambio no funciona: '/models/model.json'

            const model = await tf.loadLayersModel(modelUrl);
            modelRef.current = model;
            setStatus('Modelo cargado. ¡Listo para practicar!');
        } catch (error) {
            setStatus('Error al cargar el modelo');
            console.error(error);
        }
    };

    // 2. Función principal para el procesamiento de los landmarks
    const processLandmarks = (landmarks: any[]) => {
        if (!modelRef.current) return;
        
        // **FALTA IMPLEMENTAR:**
        // 1. Normalizar los landmarks (transformar las coordenadas X, Y, Z).
        // 2. Crear el tensor de entrada (tf.tensor) con los datos normalizados.
        // 3. Ejecutar la predicción: 
        //    const result = modelRef.current.predict(inputTensor) as tf.Tensor;
        // 4. Procesar el resultado (obtener la clase con mayor probabilidad)
        
        // Placeholder temporal:
        // setPrediction({ className: '...Procesando...', probability: 0 });
    };

    // --- EFECTO AL MONTAR EL COMPONENTE ---

    useEffect(() => {
        loadTensorFlowModel(); // 1. Cargar el modelo de IA

        // 2. Inicializar MediaPipe Hands
        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        // 3. Manejador de Resultados de MediaPipe
        hands.onResults((results) => {
            if (webcamRef.current && webcamRef.current.video) {
                const video = webcamRef.current.video;
                const canvas = canvasRef.current;
                
                if (canvas) {
                    // Configurar el canvas para que coincida con el video
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const canvasCtx = canvas.getContext('2d');
                    
                    if (canvasCtx) {
                        canvasCtx.save();
                        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                        
                        // Si se detecta una mano, procesamos los landmarks
                        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {

                            const landmarks = results.multiHandLandmarks[0];
                            
                            // Dibujar los landmarks en el canvas

                            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00ffaa', lineWidth: 5 });

                            drawLandmarks(canvasCtx, landmarks, { color: '#ff0000', lineWidth: 2, radius: 5 });

                            processLandmarks(results.multiHandLandmarks[0]);
                        }
                        
                        // Opcional: dibujar los puntos de la mano en el canvas para debug
                        // drawConnectors y drawLandmarks son funciones que deberías importar si quieres dibujar
                        
                        canvasCtx.restore();
                    }
                }
            }
        });

        // 4. Iniciar el bucle de procesamiento
        const startMediaPipeLoop = () => {
            if (webcamRef.current && webcamRef.current.video) {
                const video = webcamRef.current.video;
                const sendToHands = async () => {
                    if (video.readyState === 4) { // Asegura que el video está cargado
                        await hands.send({ image: video });
                    }
                    // Bucle continuo para el procesamiento
                    requestAnimationFrame(sendToHands); 
                };
                sendToHands();
            } else {
                // Intenta iniciar el bucle nuevamente si el video aún no está listo
                setTimeout(startMediaPipeLoop, 100); 
            }
        };

        // Esperar a que el video de la cámara cargue antes de empezar el bucle
        if (webcamRef.current && webcamRef.current.video) {
            webcamRef.current.video.addEventListener('loadeddata', startMediaPipeLoop);
        } else {
            startMediaPipeLoop();
        }

        return () => {
            hands.close();
            const modelInstance = modelRef.current;

            if (modelInstance) {
                modelInstance.dispose();
            }
        };
    }, []);

    // --- RENDERIZADO (HTML/JSX) ---

    return (
        <div style={styles.container}>
            <div style={styles.backgroundGradient}></div>
            
            <div style={styles.content}>
                {/* Header Section */}
                <div style={styles.header}>
                    <h1 style={styles.title}>
                        <span style={styles.titleIcon}>🤟</span>
                        Práctica de Lenguaje de Señas
                    </h1>
                    <p style={styles.subtitle}>Practica tus señas y recibe retroalimentación en tiempo real</p>
                </div>

                {/* Main Content Grid */}
                <div style={styles.mainGrid}>
                    {/* Video Container */}
                    <div style={styles.videoSection}>
                        <div style={styles.videoContainer}>
                            <div style={styles.videoWrapper}>
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    mirrored={true}
                                    videoConstraints={{ width: 640, height: 480 }}
                                    style={styles.webcam}
                                />
                                
                                <canvas
                                    ref={canvasRef}
                                    style={styles.canvas}
                                />

                                {/* Status Overlay */}
                                <div style={styles.statusOverlay}>
                                    <div style={styles.statusBadge}>
                                        <span style={styles.statusDot}></span>
                                        <span style={styles.statusText}>{status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with Info */}
                    <div style={styles.sidebar}>
                        {/* Prediction Card */}
                        <div style={styles.predictionCard}>
                            <div style={styles.cardHeader}>
                                <span style={styles.cardIcon}>🎯</span>
                                <h3 style={styles.cardTitle}>Seña Detectada</h3>
                            </div>
                            
                            <div style={styles.predictionDisplay}>
                                <div style={styles.predictionText}>{prediction.className}</div>
                                <div style={styles.confidenceBar}>
                                    <div style={styles.confidenceBarLabel}>
                                        <span>Confianza</span>
                                        <span style={styles.confidenceValue}>
                                            {Math.round(prediction.probability * 100)}%
                                        </span>
                                    </div>
                                    <div style={styles.confidenceBarBg}>
                                        <div style={{
                                            ...styles.confidenceBarFill,
                                            width: `${prediction.probability * 100}%`
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions Card */}
                        <div style={styles.instructionsCard}>
                            <div style={styles.cardHeader}>
                                <span style={styles.cardIcon}>💡</span>
                                <h3 style={styles.cardTitle}>Instrucciones</h3>
                            </div>
                            
                            <ul style={styles.instructionsList}>
                                <li style={styles.instructionItem}>
                                    <span style={styles.instructionNumber}>1</span>
                                    <span style={styles.instructionText}>Coloca tu mano frente a la cámara</span>
                                </li>
                                <li style={styles.instructionItem}>
                                    <span style={styles.instructionNumber}>2</span>
                                    <span style={styles.instructionText}>Asegúrate de tener buena iluminación</span>
                                </li>
                                <li style={styles.instructionItem}>
                                    <span style={styles.instructionNumber}>3</span>
                                    <span style={styles.instructionText}>Mantén la seña por unos segundos</span>
                                </li>
                                <li style={styles.instructionItem}>
                                    <span style={styles.instructionNumber}>4</span>
                                    <span style={styles.instructionText}>El sistema detectará la seña automáticamente</span>
                                </li>
                            </ul>
                        </div>

                        {/* Stats Card */}
                        <div style={styles.statsCard}>
                            <div style={styles.statItem}>
                                <span style={styles.statIcon}>👁️</span>
                                <div style={styles.statInfo}>
                                    <div style={styles.statValue}>En tiempo real</div>
                                    <div style={styles.statLabel}>Reconocimiento</div>
                                </div>
                            </div>
                            <div style={styles.statDivider}></div>
                            <div style={styles.statItem}>
                                <span style={styles.statIcon}>🤖</span>
                                <div style={styles.statInfo}>
                                    <div style={styles.statValue}>IA Avanzada</div>
                                    <div style={styles.statLabel}>MediaPipe + TensorFlow</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#0a0e27',
        width: '100%',
        padding: '40px 20px',
        boxSizing: 'border-box',
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(97, 218, 251, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    content: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5em',
        fontWeight: '700',
        color: '#e6f1ff',
        margin: '0 0 15px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
    },
    titleIcon: {
        fontSize: '1.2em',
    },
    subtitle: {
        fontSize: '1.1em',
        color: '#a8b2d1',
        margin: 0,
    },
    mainGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '30px',
        alignItems: 'start',
    },
    videoSection: {
        width: '100%',
    },
    videoContainer: {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
    videoWrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: '75%', // 4:3 aspect ratio
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    webcam: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
    statusOverlay: {
        position: 'absolute',
        top: '15px',
        left: '15px',
        zIndex: 3,
    },
    statusBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '10px 16px',
        borderRadius: '20px',
        border: '1px solid rgba(97, 218, 251, 0.3)',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#61dafb',
        animation: 'pulse 2s ease-in-out infinite',
    },
    statusText: {
        fontSize: '0.9em',
        color: '#e6f1ff',
        fontWeight: '500',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    predictionCard: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    cardIcon: {
        fontSize: '1.5em',
    },
    cardTitle: {
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#e6f1ff',
        margin: 0,
    },
    predictionDisplay: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    predictionText: {
        fontSize: '2em',
        fontWeight: '700',
        color: '#61dafb',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        borderRadius: '12px',
        border: '2px solid rgba(97, 218, 251, 0.3)',
    },
    confidenceBar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    confidenceBarLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.9em',
        color: '#a8b2d1',
        fontWeight: '500',
    },
    confidenceValue: {
        color: '#61dafb',
        fontWeight: '700',
    },
    confidenceBarBg: {
        width: '100%',
        height: '10px',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    confidenceBarFill: {
        height: '100%',
        backgroundColor: '#61dafb',
        borderRadius: '10px',
        transition: 'width 0.3s ease',
        boxShadow: '0 0 10px rgba(97, 218, 251, 0.5)',
    },
    instructionsCard: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
    instructionsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    instructionItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
    },
    instructionNumber: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'rgba(97, 218, 251, 0.2)',
        color: '#61dafb',
        fontSize: '0.85em',
        fontWeight: '700',
        flexShrink: 0,
    },
    instructionText: {
        color: '#a8b2d1',
        fontSize: '0.95em',
        lineHeight: '1.5',
    },
    statsCard: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
    },
    statIcon: {
        fontSize: '2em',
    },
    statInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    statValue: {
        fontSize: '1em',
        fontWeight: '700',
        color: '#e6f1ff',
    },
    statLabel: {
        fontSize: '0.8em',
        color: '#a8b2d1',
    },
    statDivider: {
        width: '1px',
        height: '40px',
        backgroundColor: 'rgba(97, 218, 251, 0.2)',
    },
};

export default SignRecognition;