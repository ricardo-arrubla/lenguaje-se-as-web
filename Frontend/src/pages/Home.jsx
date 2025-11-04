import { User, Mail, Lock, Eye, EyeOff, CheckCircle, Hand, Brain, TrendingUp, Award, BookOpen, Users, Heart, Star } from 'lucide-react';

const Home = () => {
  const categories = [
    { name: 'Saludos', icon: '👋', lessons: 5, color: 'from-blue-400 to-blue-600' },
    { name: 'Familia', icon: '👨‍👩‍👧', lessons: 8, color: 'from-purple-400 to-purple-600' },
    { name: 'Números', icon: '🔢', lessons: 10, color: 'from-green-400 to-green-600' },
    { name: 'Colores', icon: '🎨', lessons: 7, color: 'from-pink-400 to-pink-600' },
    { name: 'Emociones', icon: '😊', lessons: 6, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Alimentos', icon: '🍎', lessons: 9, color: 'from-red-400 to-red-600' },
  ];

  const features = [
    {
      icon: <Hand className="w-8 h-8" />,
      title: 'Aprendizaje Interactivo',
      description: 'Videos de alta calidad con demostraciones paso a paso de cada seña.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Reconocimiento de Gestos',
      description: 'Tecnología de IA para verificar que estás haciendo las señas correctamente.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Seguimiento de Progreso',
      description: 'Monitorea tu avance y mantén tu racha de aprendizaje diario.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Sistema de Logros',
      description: 'Gana puntos y desbloquea nuevas lecciones conforme avanzas.',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Estudiante',
      comment: 'Increíble plataforma. He aprendido muchísimo en solo 2 meses. Los videos son muy claros y el reconocimiento de gestos me ayuda a practicar correctamente.',
      avatar: '👩‍🎓'
    },
    {
      name: 'Carlos Ramírez',
      role: 'Padre de familia',
      comment: 'Mi hijo es sordo y esta plataforma nos ha ayudado a toda la familia a aprender LSC. Ahora podemos comunicarnos mejor en casa.',
      avatar: '👨‍👦'
    },
    {
      name: 'Ana Torres',
      role: 'Profesora',
      comment: 'Uso esta plataforma con mis estudiantes. Es intuitiva, educativa y muy completa. Definitivamente la recomiendo.',
      avatar: '👩‍🏫'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Hand className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LSC Learning
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-indigo-600 font-medium transition">
                Sobre Nosotros
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Aprende Lenguaje de Señas Colombiano
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Una plataforma interactiva para aprender LSC de forma fácil y divertida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition">
                Comenzar Ahora
              </button>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                5000+
              </div>
              <div className="text-gray-600 mt-2 font-medium">Estudiantes Activos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-gray-600 mt-2 font-medium">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                10
              </div>
              <div className="text-gray-600 mt-2 font-medium">Categorías</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-gray-600 mt-2 font-medium">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir LSC Learning?
            </h2>
            <p className="text-xl text-gray-600">
              Ofrecemos la mejor experiencia de aprendizaje con tecnología moderna
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explora nuestras categorías
            </h2>
            <p className="text-xl text-gray-600">
              Más de 50 lecciones organizadas en diferentes temas
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {category.lessons} lecciones
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto text-pink-600 mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Únete a nuestra comunidad inclusiva
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Ayudamos a personas sordas y oyentes a comunicarse sin barreras
          </p>
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition">
            Comienza Gratis
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Hand className="w-8 h-8" />
                <span className="text-xl font-bold">LSC Learning</span>
              </div>
              <p className="text-gray-400">
                Aprendizaje inclusivo de lenguaje de señas para todos
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Lecciones</li>
                <li className="hover:text-white cursor-pointer">Categorías</li>
                <li className="hover:text-white cursor-pointer">Progreso</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Ayuda</li>
                <li className="hover:text-white cursor-pointer">Comunidad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Privacidad</li>
                <li className="hover:text-white cursor-pointer">Términos</li>
                <li className="hover:text-white cursor-pointer">Contacto</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 LSC Learning. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;