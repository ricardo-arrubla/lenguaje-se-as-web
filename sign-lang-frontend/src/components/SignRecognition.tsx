// sign-lang-frontend/src/components/SignRecognition.tsx

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Hands } from '@mediapipe/hands';
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
// En SignRecognition.tsx
const loadTensorFlowModel = async () => {
    try {
        // Usa window.location.origin para asegurar la URL base
        const modelUrl = `${window.location.origin}/models/model.json`; 
        // O déjalo como estaba si el cambio no funciona: '/models/model.json'

        const model = await tf.loadLayersModel(modelUrl);
        // ... (el resto del código es igual)
    } catch (error) {
        // ...
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
        <div style={{ position: 'relative', width: 640, height: 480, margin: '50px auto' }}>
            <h2>Módulo de Práctica LSC</h2>
            <p>Estado: **{status}**</p>
            <p>Seña Predicha: **{prediction.className}** ({Math.round(prediction.probability * 100)}%)</p>

            <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true} // Espejo es más natural para el usuario
                videoConstraints={{ width: 640, height: 480 }}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: 640,
                    height: 480,
                }}
            />
            
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    zIndex: 2, // El canvas va por encima del video
                    width: 640,
                    height: 480,
                }}
            />
        </div>
    );
};

export default SignRecognition;