import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Mock data for development (remove when backend is ready)
export const mockData = {
  users: [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      role: 'admin' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  
  services: [
    {
      id: '1',
      name: 'Corte Masculino',
      description: 'Corte moderno e estiloso',
      price: 35.00,
      duration: 30,
      category: 'hair' as const,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Barba Completa',
      description: 'Aparar e modelar a barba',
      price: 25.00,
      duration: 20,
      category: 'beard' as const,
      isActive: true,
      createdAt: new Date()
    }
  ],
  
  products: [
    {
      id: '1',
      name: 'Pomada Modeladora',
      description: 'Pomada para fixação e brilho',
      price: 45.00,
      cost: 25.00,
      stock: 15,
      minStock: 5,
      category: 'cosmetic' as const,
      isActive: true,
      createdAt: new Date()
    }
  ]
};