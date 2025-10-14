import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://technova-backend-tzkn.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  // no usaremos cookies por ahora
});

// Interceptor para agregar token dinámicamente
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // lo guardaremos en login
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
