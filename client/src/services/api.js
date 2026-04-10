import axios from 'axios';

// Detect if we are in development or production
const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : (import.meta.env.VITE_API_BASE_URL || '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for logging/auth in the future
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
