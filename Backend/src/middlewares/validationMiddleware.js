const { body, param, query, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

// Validaciones de autenticación
exports.validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  
  body('isDeaf')
    .optional()
    .isBoolean().withMessage('isDeaf debe ser verdadero o falso'),
  
  this.handleValidationErrors
];

exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
  
  this.handleValidationErrors
];

exports.validateChangePassword = [
  body('currentPassword')
    .notEmpty().withMessage('La contraseña actual es requerida'),
  
  body('newPassword')
    .notEmpty().withMessage('La nueva contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  
  this.handleValidationErrors
];

// Validaciones de lecciones
exports.validateCreateLesson = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título es requerido')
    .isLength({ max: 100 }).withMessage('El título no puede exceder 100 caracteres'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('category')
    .notEmpty().withMessage('La categoría es requerida')
    .isIn(['saludos', 'familia', 'numeros', 'colores', 'verbos-cotidianos', 'partes-dia', 'lugares', 'emociones', 'alimentos', 'alfabeto'])
    .withMessage('Categoría inválida'),
  
  body('level')
    .notEmpty().withMessage('El nivel es requerido')
    .isInt({ min: 1, max: 10 }).withMessage('El nivel debe estar entre 1 y 10'),
  
  body('content.videoUrl')
    .notEmpty().withMessage('La URL del video es requerida')
    .isURL().withMessage('Debe ser una URL válida'),
  
  body('duration')
    .notEmpty().withMessage('La duración es requerida')
    .isInt({ min: 1 }).withMessage('La duración debe ser un número positivo'),
  
  this.handleValidationErrors
];

exports.validateUpdateLesson = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('El título no puede exceder 100 caracteres'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres'),
  
  body('category')
    .optional()
    .isIn(['saludos', 'familia', 'numeros', 'colores', 'verbos-cotidianos', 'partes-dia', 'lugares', 'emociones', 'alimentos', 'alfabeto'])
    .withMessage('Categoría inválida'),
  
  body('level')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('El nivel debe estar entre 1 y 10'),
  
  this.handleValidationErrors
];

// Validación de ID de MongoDB
exports.validateMongoId = [
  param('id')
    .isMongoId().withMessage('ID inválido'),
  
  this.handleValidationErrors
];

// Validaciones de progreso
exports.validateQuizAnswer = [
  body('questionId')
    .notEmpty().withMessage('El ID de la pregunta es requerido')
    .isMongoId().withMessage('ID de pregunta inválido'),
  
  body('answer')
    .notEmpty().withMessage('La respuesta es requerida'),
  
  this.handleValidationErrors
];

exports.validateGestureAccuracy = [
  body('signWord')
    .trim()
    .notEmpty().withMessage('La palabra de la seña es requerida'),
  
  body('accuracy')
    .notEmpty().withMessage('La precisión es requerida')
    .isFloat({ min: 0, max: 100 }).withMessage('La precisión debe estar entre 0 y 100'),
  
  this.handleValidationErrors
];

// Validaciones de query params
exports.validateLessonFilters = [
  query('category')
    .optional()
    .isIn(['saludos', 'familia', 'numeros', 'colores', 'verbos-cotidianos', 'partes-dia', 'lugares', 'emociones', 'alimentos', 'alfabeto'])
    .withMessage('Categoría inválida'),
  
  query('level')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('El nivel debe estar entre 1 y 10'),
  
  this.handleValidationErrors
];