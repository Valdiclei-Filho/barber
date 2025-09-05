import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { authService } from '../services/auth';
import toast from 'react-hot-toast';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(email, password);
          set({
            user: response.user,
            isAuthenticated: true,
            loading: false
          });
          toast.success('Login realizado com sucesso!');
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao fazer login',
            loading: false
          });
          toast.error(error.message || 'Erro ao fazer login');
        }
      },

      register: async (userData: any) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.register(userData);
          set({
            user: response.user,
            isAuthenticated: true,
            loading: false
          });
          toast.success('Conta criada com sucesso!');
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar conta',
            loading: false
          });
          toast.error(error.message || 'Erro ao criar conta');
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
        toast.success('Logout realizado com sucesso!');
      },

      forgotPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
          await authService.forgotPassword(email);
          set({ loading: false });
          toast.success('Email de recuperação enviado!');
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao enviar email',
            loading: false
          });
          toast.error(error.message || 'Erro ao enviar email');
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.updateProfile(userData);
          set({
            user: response.user,
            loading: false
          });
          toast.success('Perfil atualizado com sucesso!');
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao atualizar perfil',
            loading: false
          });
          toast.error(error.message || 'Erro ao atualizar perfil');
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);