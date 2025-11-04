const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const lessonRoutes = require('./lessonRoutes');

// Montar rutas
router.use('/auth', authRoutes);
router.use('/lessons', lessonRoutes);

// Ruta de salud del API
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;