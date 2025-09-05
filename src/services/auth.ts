import api, { mockData } from './api';
import { User } from '../types';

export const authService = {
  async login(email: string, password: string) {
    try {
      // Mock login for development
      if (email === 'admin@barbershop.com' && password === 'admin123') {
        const user = mockData.users[0];
        const token = 'mock-token-12345';
        localStorage.setItem('auth-token', token);
        return { user, token };
      }
      throw new Error('Credenciais inválidas');
      
      // Real API call (uncomment when backend is ready)
      // const response = await api.post('/auth/login', { email, password });
      // const { user, token } = response.data;
      // localStorage.setItem('auth-token', token);
      // return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  async register(userData: any) {
    try {
      // Mock register for development
      const user: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || 'client',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const token = 'mock-token-' + Date.now();
      localStorage.setItem('auth-token', token);
      return { user, token };
      
      // Real API call (uncomment when backend is ready)
      // const response = await api.post('/auth/register', userData);
      // const { user, token } = response.data;
      // localStorage.setItem('auth-token', token);
      // return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  async forgotPassword(email: string) {
    try {
      // Mock implementation
      console.log('Password reset email sent to:', email);
      return { message: 'Email de recuperação enviado' };
      
      // Real API call (uncomment when backend is ready)
      // const response = await api.post('/auth/forgot-password', { email });
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  async updateProfile(userData: Partial<User>) {
    try {
      // Mock implementation
      const updatedUser = { ...mockData.users[0], ...userData };
      return { user: updatedUser };
      
      // Real API call (uncomment when backend is ready)
      // const response = await api.put('/auth/profile', userData);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-storage');
  }
};