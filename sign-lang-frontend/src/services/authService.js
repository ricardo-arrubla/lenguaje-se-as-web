// sign-lang-frontend/src/services/authService.js

// URL base de la API, obtenida del archivo .env.local
const API_BASE_URL = import.meta.env.VITE_DJANGO_API_BASE_URL;

// --- Función Auxiliar para Manejo de Errores de la API ---
const handleApiError = async (response) => {
    const errorData = await response.json();
    let errorMessage = 'Error desconocido en la API.';

    if (errorData.detail) {
        // Mensaje genérico de error de Django REST Framework (ej. "Credenciales inválidas")
        errorMessage = errorData.detail;
    } else if (Object.keys(errorData).length > 0) {
        // Errores de validación de campos específicos (ej. username ya existe)
        const fieldErrors = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(' ')}`)
            .join(' | ');
        errorMessage = `Error de validación: ${fieldErrors}`;
    } else {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
    }

    throw new Error(errorMessage);
};

// --- 1. REGISTRO ---
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    return response.json(); 
};

// --- 2. LOGIN (Obtener Tokens) ---
export const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        await handleApiError(response);
    }

    // Guarda los tokens en el almacenamiento local para usarlos después
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data;
};

// --- 3. LOGOUT (Limpiar Tokens) ---
export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};