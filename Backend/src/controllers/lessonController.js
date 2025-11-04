const lessonService = require('../services/lessonService');

// @desc    Obtener todas las lecciones
// @route   GET /api/lessons
// @access  Public
exports.getAllLessons = async (req, res) => {
  try {
    const { category, level } = req.query;
    const lessons = await lessonService.getAllLessons({ category, level });

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener lección por ID
// @route   GET /api/lessons/:id
// @access  Public
exports.getLessonById = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const lesson = await lessonService.getLessonById(req.params.id, userId);

    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener lecciones por categoría
// @route   GET /api/lessons/category/:category
// @access  Public
exports.getLessonsByCategory = async (req, res) => {
  try {
    const lessons = await lessonService.getLessonsByCategory(req.params.category);

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear nueva lección
// @route   POST /api/lessons
// @access  Private/Admin
exports.createLesson = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const lesson = await lessonService.createLesson(req.body);

    res.status(201).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Actualizar lección
// @route   PUT /api/lessons/:id
// @access  Private/Admin
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Eliminar lección
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
exports.deleteLesson = async (req, res) => {
  try {
    const result = await lessonService.deleteLesson(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Iniciar lección
// @route   POST /api/lessons/:id/start
// @access  Private
exports.startLesson = async (req, res) => {
  try {
    const progress = await lessonService.startLesson(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Enviar respuesta de quiz
// @route   POST /api/lessons/:id/quiz
// @access  Private
exports.submitQuizAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    
    const result = await lessonService.submitQuizAnswer(
      req.user.id,
      req.params.id,
      questionId,
      answer
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Enviar precisión de gesto
// @route   POST /api/lessons/:id/gesture
// @access  Private
exports.submitGestureAccuracy = async (req, res) => {
  try {
    const { signWord, accuracy } = req.body;
    
    const result = await lessonService.submitGestureAccuracy(
      req.user.id,
      req.params.id,
      signWord,
      accuracy
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Completar lección
// @route   POST /api/lessons/:id/complete
// @access  Private
exports.completeLesson = async (req, res) => {
  try {
    const result = await lessonService.completeLesson(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener progreso de usuario en lección
// @route   GET /api/lessons/:id/progress
// @access  Private
exports.getUserLessonProgress = async (req, res) => {
  try {
    const progress = await lessonService.getUserLessonProgress(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener estadísticas del usuario
// @route   GET /api/lessons/stats/me
// @access  Private
exports.getUserStats = async (req, res) => {
  try {
    const stats = await lessonService.getUserStats(req.user.id);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};