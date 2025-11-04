const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'saludos',
      'familia',
      'numeros',
      'colores',
      'verbos-cotidianos',
      'partes-dia',
      'lugares',
      'emociones',
      'alimentos',
      'alfabeto'
    ]
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  content: {
    videoUrl: {
      type: String,
      required: [true, 'El video es requerido']
    },
    thumbnailUrl: {
      type: String,
      default: 'default-thumbnail.jpg'
    },
    signs: [{
      word: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      videoUrl: {
        type: String,
        required: true
      },
      keyPoints: {
        type: [String],
        default: []
      }
    }]
  },
  quiz: [{
    question: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['multiple-choice', 'gesture-recognition', 'matching'],
      default: 'multiple-choice'
    },
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    correctAnswer: {
      type: String
    },
    gestureReference: {
      type: String
    },
    points: {
      type: Number,
      default: 10
    }
  }],
  duration: {
    type: Number,
    required: true,
    comment: 'Duración en minutos'
  },
  requiredLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    default: null
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  completionRate: {
    type: Number,
    default: 0
  },
  enrolledUsers: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
lessonSchema.index({ category: 1, level: 1 });
lessonSchema.index({ isPublished: 1 });

// Virtual para calcular número total de señas
lessonSchema.virtual('totalSigns').get(function() {
  return this.content.signs.length;
});

// Método para verificar si una lección está desbloqueada para un usuario
lessonSchema.methods.isUnlockedFor = async function(user) {
  if (!this.requiredLesson) return true;
  
  return user.progress.lessonsCompleted.includes(this.requiredLesson);
};

module.exports = mongoose.model('Lesson', lessonSchema);