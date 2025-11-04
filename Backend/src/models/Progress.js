const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  status: {
    type: String,
    enum: ['no-iniciada', 'en-progreso', 'completada'],
    default: 'no-iniciada'
  },
  attempts: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0,
    comment: 'Tiempo en minutos'
  },
  quizResults: [{
    questionId: mongoose.Schema.Types.ObjectId,
    isCorrect: Boolean,
    attemptedAt: {
      type: Date,
      default: Date.now
    }
  }],
  gestureAccuracy: [{
    signWord: String,
    accuracy: {
      type: Number,
      min: 0,
      max: 100
    },
    attempts: Number,
    lastAttempt: Date
  }],
  feedback: {
    type: String,
    maxlength: 1000
  },
  completedAt: {
    type: Date
  },
  startedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice compuesto para evitar duplicados
progressSchema.index({ user: 1, lesson: 1 }, { unique: true });

// Método para calcular puntuación final
progressSchema.methods.calculateFinalScore = function() {
  const quizScore = this.quizResults.length > 0
    ? (this.quizResults.filter(r => r.isCorrect).length / this.quizResults.length) * 70
    : 0;

  const gestureScore = this.gestureAccuracy.length > 0
    ? (this.gestureAccuracy.reduce((acc, g) => acc + g.accuracy, 0) / this.gestureAccuracy.length) * 0.3
    : 0;

  this.score = Math.round(quizScore + gestureScore);
  
  if (this.score >= 70) {
    this.status = 'completada';
    this.completedAt = Date.now();
  }
  
  return this.score;
};

// Método para agregar resultado de quiz
progressSchema.methods.addQuizResult = function(questionId, isCorrect) {
  this.quizResults.push({
    questionId,
    isCorrect,
    attemptedAt: Date.now()
  });
  
  this.attempts += 1;
  this.status = 'en-progreso';
};

// Método para registrar precisión de gesto
progressSchema.methods.addGestureAccuracy = function(signWord, accuracy) {
  const existingGesture = this.gestureAccuracy.find(g => g.signWord === signWord);
  
  if (existingGesture) {
    existingGesture.attempts += 1;
    existingGesture.accuracy = Math.round((existingGesture.accuracy + accuracy) / 2);
    existingGesture.lastAttempt = Date.now();
  } else {
    this.gestureAccuracy.push({
      signWord,
      accuracy,
      attempts: 1,
      lastAttempt: Date.now()
    });
  }
};

module.exports = mongoose.model('Progress', progressSchema);