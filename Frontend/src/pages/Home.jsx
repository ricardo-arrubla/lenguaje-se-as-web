import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, Award, TrendingUp, Hand, Brain, Heart } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Hand,
      title: 'Aprendizaje Interactivo',
      description: 'Videos de alta calidad con demostraciones paso a paso de cada seña.'
    },
    {
      icon: Brain,
      title: 'Reconocimiento de Gestos',
      description: 'Tecnología de IA para verificar que estás haciendo las señas correctamente.'
    },
    {
      icon: TrendingUp,
      title: 'Seguimiento de Progreso',
      description: 'Monitorea tu avance y mantén tu racha de aprendizaje diario.'
    },
    {
      icon: Award,
      title: 'Sistema de Logros',
      description: 'Gana puntos y desbloquea nuevas lecciones conforme avanzas.'
    }
  ];

  const categories = [
    { name: 'Saludos', icon: '👋', lessons: 5, color: 'bg-blue-100 text-blue-600' },
    { name: 'Familia', icon: '👨‍👩‍👧', lessons: 8, color: 'bg-purple-100 text-purple-600' },
    { name: 'Números', icon: '🔢', lessons: 10, color: 'bg-green-100 text-green-600' },
    { name: 'Colores', icon: '🎨', lessons: 7, color: 'bg-pink-100 text-pink-600' },
    { name: 'Emociones', icon: '😊', lessons: 6, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Alimentos', icon: '🍎', lessons: 9, color: 'bg-red-100 text-red-600' }
  ];

  const stats = [
    { value: '5000+', label: 'Estudiantes Activos' },
    { value: '50+', label: 'Lecciones' },
    { value: '10', label: 'Categorías' },
    { value: '95%', label: 'Satisfacción' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Aprende Lenguaje de Señas Colombiano
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up">
              Una plataforma interactiva para aprender LSC de forma fácil y divertida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              {isAuthenticated ? (
                <Link
                  to="/lecciones"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Continuar Aprendiendo
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Comenzar Gratis
                  </Link>
                  <Link
                    to="/login"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all"
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir LSC Learning?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de aprendizaje con tecnología moderna
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explora nuestras categorías
            </h2>
            <p className="text-xl text-gray-600">
              Más de 50 lecciones organizadas en diferentes temas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={isAuthenticated ? `/lecciones?category=${category.name.toLowerCase()}` : '/register'}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-primary-500 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.lessons} lecciones</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Únete a nuestra comunidad inclusiva
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Ayudamos a personas sordas y oyentes a comunicarse sin barreras
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Comenzar Ahora - Es Gratis
            </Link>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Estudiante',
                text: 'Increíble plataforma. He aprendido muchísimo en solo 2 meses. Los videos son muy claros y el reconocimiento de gestos me ayuda a practicar correctamente.'
              },
              {
                name: 'Carlos Ramírez',
                role: 'Padre de familia',
                text: 'Mi hijo es sordo y esta plataforma nos ha ayudado a toda la familia a aprender LSC. Ahora podemos comunicarnos mejor en casa.'
              },
              {
                name: 'Ana Torres',
                role: 'Profesora',
                text: 'Uso esta plataforma con mis estudiantes. Es intuitiva, educativa y muy completa. Definitivamente la recomiendo.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;