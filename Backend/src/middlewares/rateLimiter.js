const rateLimit = require('express-rate-limit');

// Rate limiter general para API
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter estricto para autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos de login
  skipSuccessfulRequests: true, // No contar requests exitosos
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión, por favor intente más tarde'
  }
});

// Rate limiter para creación de recursos (más permisivo)
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // 20 creaciones por hora
  message: {
    success: false,
    message: 'Límite de creación alcanzado, por favor espere antes de crear más recursos'
  }
});

module.exports = {
  apiLimiter,
  authLimiter,
  createLimiter
};