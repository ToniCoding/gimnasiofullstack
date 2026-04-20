import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Interceptor para añadir token a todas las peticiones
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);

// User
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (data) => API.patch('/users/profile', data);

// Training Sessions
export const createTrainingSession = (data) => API.post('/training-sessions', data);
export const getSessionsSummary = () => API.get('/training-sessions');
export const getAllSessions = () => API.get('/training-sessions/all');
export const getSessionById = (id) => API.get(`/training-sessions/${id}`);

// Exercises
export const getAllExercises = () => API.get('/exercises');
export const searchExercises = (nombre) => API.get(`/exercises/search?nombre=${nombre}`);

export default API;
