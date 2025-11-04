import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      const message = error.response.data?.message || 'Error en la solicitud';
      
      // Si el token expiró o es inválido
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Error de red
      return Promise.reject(new Error('Error de conexión. Verifica tu internet.'));
    } else {
      return Promise.reject(error);
    }
  }
);

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  logout: () => api.post('/auth/logout'),
};

// Lesson Services
export const lessonService = {
  getAllLessons: (params) => api.get('/lessons', { params }),
  getLessonById: (id) => api.get(`/lessons/${id}`),
  getLessonsByCategory: (category) => api.get(`/lessons/category/${category}`),
  createLesson: (data) => api.post('/lessons', data),
  updateLesson: (id, data) => api.put(`/lessons/${id}`, data),
  deleteLesson: (id) => api.delete(`/lessons/${id}`),
  
  // Progreso
  startLesson: (id) => api.post(`/lessons/${id}/start`),
  getLessonProgress: (id) => api.get(`/lessons/${id}/progress`),
  submitQuizAnswer: (id, data) => api.post(`/lessons/${id}/quiz`, data),
  submitGestureAccuracy: (id, data) => api.post(`/lessons/${id}/gesture`, data),
  completeLesson: (id) => api.post(`/lessons/${id}/complete`),
  getUserStats: () => api.get('/lessons/stats/me'),
};

// Health Check
export const healthCheck = () => api.get('/health');

export default api;