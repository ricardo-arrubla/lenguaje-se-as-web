const Lesson = require('../models/Lesson');

const lessonsData = [
  {
    title: 'Saludos Básicos',
    description: 'Aprende los saludos más comunes en LSC: hola, buenos días, buenas tardes, buenas noches.',
    category: 'saludos',
    level: 1,
    content: {
      videoUrl: 'https://ejemplo.com/videos/saludos-basicos.mp4',
      thumbnailUrl: 'https://ejemplo.com/thumbnails/saludos.jpg',
      signs: [
        {
          word: 'Hola',
          description: 'Mano abierta, movimiento ondulante cerca de la cabeza',
          videoUrl: 'https://ejemplo.com/videos/hola.mp4',
          keyPoints: ['Mano abierta', 'Movimiento suave', 'A la altura de la cara']
        },
        {
          word: 'Buenos días',
          description: 'Señal de sol naciente con las manos',
          videoUrl: 'https://ejemplo.com/videos/buenos-dias.mp4',
          keyPoints: ['Manos juntas', 'Movimiento ascendente', 'Simula amanecer']
        },
        {
          word: 'Buenas tardes',
          description: 'Mano señalando horizonte',
          videoUrl: 'https://ejemplo.com/videos/buenas-tardes.mp4',
          keyPoints: ['Mano horizontal', 'Posición media', 'Sol en el horizonte']
        }
      ]
    },
    quiz: [
      {
        question: '¿Cómo se dice "Hola" en LSC?',
        type: 'multiple-choice',
        options: [
          { text: 'Mano cerrada moviendo', isCorrect: false },
          { text: 'Mano abierta ondulante cerca de la cabeza', isCorrect: true },
          { text: 'Dos manos juntas', isCorrect: false }
        ],
        correctAnswer: 'Mano abierta ondulante cerca de la cabeza',
        points: 10
      },
      {
        question: 'Realiza la seña de "Buenos días"',
        type: 'gesture-recognition',
        gestureReference: 'buenos-dias',
        points: 15
      }
    ],
    duration: 15,
    isPublished: true
  },
  {
    title: 'Números del 1 al 10',
    description: 'Aprende a contar del 1 al 10 usando lenguaje de señas colombiano.',
    category: 'numeros',
    level: 1,
    content: {
      videoUrl: 'https://ejemplo.com/videos/numeros-1-10.mp4',
      thumbnailUrl: 'https://ejemplo.com/thumbnails/numeros.jpg',
      signs: [
        {
          word: '1',
          description: 'Dedo índice extendido',
          videoUrl: 'https://ejemplo.com/videos/uno.mp4',
          keyPoints: ['Solo índice', 'Mano vertical']
        },
        {
          word: '2',
          description: 'Dedos índice y medio extendidos',
          videoUrl: 'https://ejemplo.com/videos/dos.mp4',
          keyPoints: ['Índice y medio', 'Forma de V']
        },
        {
          word: '3',
          description: 'Dedos índice, medio y anular extendidos',
          videoUrl: 'https://ejemplo.com/videos/tres.mp4',
          keyPoints: ['Tres dedos', 'Extendidos hacia arriba']
        }
      ]
    },
    quiz: [
      {
        question: '¿Cuántos dedos se usan para el número 3?',
        type: 'multiple-choice',
        options: [
          { text: 'Dos dedos', isCorrect: false },
          { text: 'Tres dedos', isCorrect: true },
          { text: 'Cuatro dedos', isCorrect: false }
        ],
        correctAnswer: 'Tres dedos',
        points: 10
      }
    ],
    duration: 20,
    isPublished: true
  },
  {
    title: 'Familia',
    description: 'Vocabulario sobre miembros de la familia: mamá, papá, hermano, hermana, abuelo, abuela.',
    category: 'familia',
    level: 2,
    content: {
      videoUrl: 'https://ejemplo.com/videos/familia.mp4',
      thumbnailUrl: 'https://ejemplo.com/thumbnails/familia.jpg',
      signs: [
        {
          word: 'Mamá',
          description: 'Dedo pulgar tocando barbilla',
          videoUrl: 'https://ejemplo.com/videos/mama.mp4',
          keyPoints: ['Pulgar en barbilla', 'Movimiento suave']
        },
        {
          word: 'Papá',
          description: 'Dedo pulgar tocando frente',
          videoUrl: 'https://ejemplo.com/videos/papa.mp4',
          keyPoints: ['Pulgar en frente', 'Posición firme']
        }
      ]
    },
    quiz: [
      {
        question: '¿Dónde se coloca el pulgar para "Mamá"?',
        type: 'multiple-choice',
        options: [
          { text: 'En la frente', isCorrect: false },
          { text: 'En la barbilla', isCorrect: true },
          { text: 'En la nariz', isCorrect: false }
        ],
        correctAnswer: 'En la barbilla',
        points: 10
      }
    ],
    duration: 18,
    isPublished: true
  },
  {
    title: 'Verbos Cotidianos',
    description: 'Aprende verbos de uso diario: comer, dormir, trabajar, estudiar.',
    category: 'verbos-cotidianos',
    level: 3,
    content: {
      videoUrl: 'https://ejemplo.com/videos/verbos.mp4',
      thumbnailUrl: 'https://ejemplo.com/thumbnails/verbos.jpg',
      signs: [
        {
          word: 'Comer',
          description: 'Mano a la boca repetidamente',
          videoUrl: 'https://ejemplo.com/videos/comer.mp4',
          keyPoints: ['Mano hacia boca', 'Movimiento repetitivo']
        },
        {
          word: 'Dormir',
          description: 'Mano en posición de almohada junto a la cabeza',
          videoUrl: 'https://ejemplo.com/videos/dormir.mp4',
          keyPoints: ['Mano junto a mejilla', 'Ojos cerrados']
        }
      ]
    },
    quiz: [
      {
        question: 'Realiza la seña de "Comer"',
        type: 'gesture-recognition',
        gestureReference: 'comer',
        points: 15
      }
    ],
    duration: 25,
    isPublished: true
  },
  {
    title: 'Colores Básicos',
    description: 'Aprende los colores principales: rojo, azul, amarillo, verde, negro, blanco.',
    category: 'colores',
    level: 2,
    content: {
      videoUrl: 'https://ejemplo.com/videos/colores.mp4',
      thumbnailUrl: 'https://ejemplo.com/thumbnails/colores.jpg',
      signs: [
        {
          word: 'Rojo',
          description: 'Dedo índice señalando labios',
          videoUrl: 'https://ejemplo.com/videos/rojo.mp4',
          keyPoints: ['Índice en labios', 'Color de labios']
        },
        {
          word: 'Azul',
          description: 'Movimiento ondulante con mano',
          videoUrl: 'https://ejemplo.com/videos/azul.mp4',
          keyPoints: ['Movimiento de ola', 'Simula agua/cielo']
        }
      ]
    },
    quiz: [
      {
        question: '¿Qué parte del cuerpo se señala para "Rojo"?',
        type: 'multiple-choice',
        options: [
          { text: 'Los ojos', isCorrect: false },
          { text: 'Los labios', isCorrect: true },
          { text: 'La nariz', isCorrect: false }
        ],
        correctAnswer: 'Los labios',
        points: 10
      }
    ],
    duration: 22,
    isPublished: true
  }
];

const seedLessons = async () => {
  try {
    await Lesson.deleteMany({});
    const lessons = await Lesson.insertMany(lessonsData);
    console.log(`✅ ${lessons.length} lecciones creadas exitosamente`);
    return lessons;
  } catch (error) {
    console.error('❌ Error al crear lecciones:', error);
    throw error;
  }
};

module.exports = seedLessons;