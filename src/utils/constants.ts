// Application Constants

export const API_BASE_URL = 'http://localhost:3001/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  BOOKINGS: '/bookings',
  CLIENTS: '/clients',
  BARBERS: '/barbers',
  SERVICES: '/services',
  PRODUCTS: '/products',
  PAYMENTS: '/payments',
  REPORTS: '/reports',
  PROFILE: '/profile',
  SETTINGS: '/settings'
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  BARBER: 'barber',
  CLIENT: 'client'
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;

export const SERVICE_CATEGORIES = {
  HAIR: 'hair',
  BEARD: 'beard',
  COMBO: 'combo',
  TREATMENT: 'treatment'
} as const;

export const PRODUCT_CATEGORIES = {
  BEVERAGE: 'beverage',
  COSMETIC: 'cosmetic',
  ACCESSORY: 'accessory'
} as const;

export const COLORS = {
  primary: '#8B5CF6',
  secondary: '#06B6D4',
  accent: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
};

export const WORKING_HOURS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
];