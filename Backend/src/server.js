require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { apiLimiter } = require('./middlewares/rateLimiter');

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares de seguridad
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', apiLimiter);

// Rutas principales
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Plataforma LSC',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      lessons: '/api/lessons',
      health: '/api/health'
    }
  });
});

// Manejo de rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Servidor LSC Backend iniciado       ║
║   📡 Puerto: ${PORT}                         ║
║   🌍 Entorno: ${process.env.NODE_ENV || 'development'}           ║
║   📝 API: http://localhost:${PORT}/api      ║
╚═══════════════════════════════════════════╝
  `);
});

// Manejo de rechazos de promesas no capturados
process.on('unhandledRejection', (err) => {
  console.error(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;