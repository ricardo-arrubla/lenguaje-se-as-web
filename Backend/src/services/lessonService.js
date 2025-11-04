const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const User = require('../models/User');

class LessonService {
  // Obtener todas las lecciones
  async getAllLessons(filters = {}) {
    const { category, level, isPublished = true } = filters;
    
    const query = { isPublished };
    
    if (category) query.category = category;
    if (level) query.level = parseInt(level);

    const lessons = await Lesson.find(query)
      .sort({ level: 1, createdAt: 1 })
      .select('-quiz'); // No incluir quiz en listado general

    return lessons;
  }

  // Obtener lección por ID
  async getLessonById(lessonId, userId = null) {
    const lesson = await Lesson.findById(lessonId)
      .populate('requiredLesson', 'title level');

    if (!lesson) {
      throw new Error('Lección no encontrada');
    }

    // Si hay usuario, verificar si está desbloqueada
    if (userId) {
      const user = await User.findById(userId);
      const isUnlocked = await lesson.isUnlockedFor(user);
      
      return {
        ...lesson.toObject(),
        isUnlocked
      };
    }

    return lesson;
  }

  // Obtener lecciones por categoría
  async getLessonsByCategory(category) {
    const lessons = await Lesson.find({ 
      category, 
      isPublished: true 
    }).sort({ level: 1 });

    return lessons;
  }

  // Crear nueva lección (solo admin)
  async createLesson(lessonData) {
    const lesson = await Lesson.create(lessonData);
    return lesson;
  }

  // Actualizar lección
  async updateLesson(lessonId, updates) {
    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      updates,
      { new: true, runValidators: true }
    );

    if (!lesson) {
      throw new Error('Lección no encontrada');
    }

    return lesson;
  }

  // Eliminar lección
  async deleteLesson(lessonId) {
    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) {
      throw new Error('Lección no encontrada');
    }

    // Eliminar progreso asociado
    await Progress.deleteMany({ lesson: lessonId });

    return { message: 'Lección eliminada exitosamente' };
  }

  // Obtener progreso de usuario en una lección
  async getUserLessonProgress(userId, lessonId) {
    let progress = await Progress.findOne({ 
      user: userId, 
      lesson: lessonId 
    }).populate('lesson', 'title category level');

    if (!progress) {
      // Crear registro de progreso si no existe
      progress = await Progress.create({
        user: userId,
        lesson: lessonId,
        status: 'no-iniciada'
      });
    }

    return progress;
  }

  // Iniciar lección
  async startLesson(userId, lessonId) {
    const lesson = await Lesson.findById(lessonId);
    
    if (!lesson) {
      throw new Error('Lección no encontrada');
    }

    // Verificar si está desbloqueada
    const user = await User.findById(userId);
    const isUnlocked = await lesson.isUnlocked For(user);
    
    if (!isUnlocked) {
      throw new Error('Lección bloqueada. Complete la lección requerida primero.');
    }

    let progress = await Progress.findOne({ user: userId, lesson: lessonId });

    if (!progress) {
      progress = await Progress.create({
        user: userId,
        lesson: lessonId,
        status: 'en-progreso',
        startedAt: Date.now()
      });

      // Incrementar contador de usuarios inscritos
      lesson.enrolledUsers += 1;
      await lesson.save();
    } else {
      progress.status = 'en-progreso';
      await progress.save();
    }

    return progress;
  }

  // Enviar respuesta de quiz
  async submitQuizAnswer(userId, lessonId, questionId, answer) {
    const lesson = await Lesson.findById(lessonId);
    const progress = await Progress.findOne({ user: userId, lesson: lessonId });

    if (!lesson || !progress) {
      throw new Error('Lección o progreso no encontrado');
    }

    const question = lesson.quiz.id(questionId);
    if (!question) {
      throw new Error('Pregunta no encontrada');
    }

    // Verificar respuesta
    let isCorrect = false;
    if (question.type === 'multiple-choice') {
      const selectedOption = question.options.find(opt => opt.text === answer);
      isCorrect = selectedOption?.isCorrect || false;
    }

    // Registrar resultado
    progress.addQuizResult(questionId, isCorrect);
    await progress.save();

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      currentScore: progress.score
    };
  }

  // Registrar precisión de gesto
  async submitGestureAccuracy(userId, lessonId, signWord, accuracy) {
    const progress = await Progress.findOne({ user: userId, lesson: lessonId });

    if (!progress) {
      throw new Error('Progreso no encontrado');
    }

    progress.addGestureAccuracy(signWord, accuracy);
    await progress.save();

    return {
      message: 'Precisión de gesto registrada',
      averageAccuracy: Math.round(
        progress.gestureAccuracy.reduce((acc, g) => acc + g.accuracy, 0) / 
        progress.gestureAccuracy.length
      )
    };
  }

  // Completar lección
  async completeLesson(userId, lessonId) {
    const progress = await Progress.findOne({ user: userId, lesson: lessonId });
    const user = await User.findById(userId);

    if (!progress || !user) {
      throw new Error('Progreso o usuario no encontrado');
    }

    // Calcular puntuación final
    const finalScore = progress.calculateFinalScore();
    await progress.save();

    if (finalScore >= 70) {
      // Agregar a lecciones completadas si no está ya
      if (!user.progress.lessonsCompleted.includes(lessonId)) {
        user.progress.lessonsCompleted.push(lessonId);
        user.progress.totalScore += finalScore;
        
        // Actualizar nivel si es necesario
        const completedCount = user.progress.lessonsCompleted.length;
        user.progress.currentLevel = Math.floor(completedCount / 5) + 1;
        
        await user.save();
      }

      // Actualizar tasa de completitud de la lección
      const lesson = await Lesson.findById(lessonId);
      const totalProgress = await Progress.countDocuments({ lesson: lessonId });
      const completedProgress = await Progress.countDocuments({ 
        lesson: lessonId, 
        status: 'completada' 
      });
      
      lesson.completionRate = (completedProgress / totalProgress) * 100;
      await lesson.save();

      return {
        message: '¡Felicitaciones! Lección completada',
        score: finalScore,
        newLevel: user.progress.currentLevel,
        totalCompleted: user.progress.lessonsCompleted.length
      };
    } else {
      return {
        message: 'Necesitas al menos 70% para completar la lección',
        score: finalScore,
        canRetry: true
      };
    }
  }

  // Obtener estadísticas del usuario
  async getUserStats(userId) {
    const user = await User.findById(userId).populate('progress.lessonsCompleted');
    const allProgress = await Progress.find({ user: userId });

    const stats = {
      totalLessons: user.progress.lessonsCompleted.length,
      currentLevel: user.progress.currentLevel,
      totalScore: user.progress.totalScore,
      streakDays: user.progress.streakDays,
      averageScore: allProgress.length > 0 
        ? Math.round(allProgress.reduce((acc, p) => acc + p.score, 0) / allProgress.length)
        : 0,
      categoriesCompleted: [...new Set(
        user.progress.lessonsCompleted.map(l => l.category)
      )].length,
      timeSpent: allProgress.reduce((acc, p) => acc + p.timeSpent, 0),
      recentActivity: allProgress
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 5)
    };

    return stats;
  }
}

module.exports = new LessonService();