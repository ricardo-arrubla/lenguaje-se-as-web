const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { protect, authorize, optionalAuth } = require('../middlewares/authMiddleware');
const { createLimiter } = require('../middlewares/rateLimiter');
const {
  validateCreateLesson,
  validateUpdateLesson,
  validateMongoId,
  validateQuizAnswer,
  validateGestureAccuracy,
  validateLessonFilters
} = require('../middlewares/validationMiddleware');

// Rutas públicas/opcionales
router.get('/', validateLessonFilters, lessonController.getAllLessons);
router.get('/category/:category', lessonController.getLessonsByCategory);
router.get('/:id', validateMongoId, optionalAuth, lessonController.getLessonById);

// Rutas protegidas - Usuario
router.post('/:id/start', protect, validateMongoId, lessonController.startLesson);
router.get('/:id/progress', protect, validateMongoId, lessonController.getUserLessonProgress);
router.post('/:id/quiz', protect, validateMongoId, validateQuizAnswer, lessonController.submitQuizAnswer);
router.post('/:id/gesture', protect, validateMongoId, validateGestureAccuracy, lessonController.submitGestureAccuracy);
router.post('/:id/complete', protect, validateMongoId, lessonController.completeLesson);
router.get('/stats/me', protect, lessonController.getUserStats);

// Rutas protegidas - Admin
router.post('/', protect, authorize('admin'), createLimiter, validateCreateLesson, lessonController.createLesson);
router.put('/:id', protect, authorize('admin'), validateMongoId, validateUpdateLesson, lessonController.updateLesson);
router.delete('/:id', protect, authorize('admin'), validateMongoId, lessonController.deleteLesson);

module.exports = router;