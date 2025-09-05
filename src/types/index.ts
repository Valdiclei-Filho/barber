// Global Types and Interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'barber' | 'client';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'client';
  loyaltyPoints: number;
  isVip: boolean;
  totalSpent: number;
  lastVisit?: Date;
}

export interface Barber extends User {
  role: 'barber';
  specialties: string[];
  commissionRate: number;
  workingHours: WorkingHours;
  isActive: boolean;
  totalEarnings: number;
}

export interface WorkingHours {
  [key: string]: {
    start: string;
    end: string;
    isWorking: boolean;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  category: 'hair' | 'beard' | 'combo' | 'treatment';
  isActive: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  clientId: string;
  client: Client;
  barberId: string;
  barber: Barber;
  services: Service[];
  date: Date;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  category: 'beverage' | 'cosmetic' | 'accessory';
  image?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Payment {
  id: string;
  bookingId?: string;
  clientId: string;
  amount: number;
  method: 'pix' | 'card' | 'cash' | 'boleto';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'rent' | 'utilities' | 'supplies' | 'marketing' | 'other';
  date: Date;
  createdAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalClients: number;
  newClients: number;
  lowStockProducts: number;
  topServices: Array<{
    service: Service;
    bookings: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    expenses: number;
  }>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'time';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: any;
}