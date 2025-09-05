// Helper Functions and Utilities

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

export const formatTime = (time: string): string => {
  return time.slice(0, 5); // HH:MM format
};

export const calculateServiceDuration = (services: any[]): number => {
  return services.reduce((total, service) => total + service.duration, 0);
};

export const calculateEndTime = (startTime: string, durationMinutes: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  
  return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/;
  return phoneRegex.test(phone);
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    confirmed: 'text-blue-600 bg-blue-50',
    in_progress: 'text-indigo-600 bg-indigo-50',
    completed: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50',
    paid: 'text-green-600 bg-green-50',
    failed: 'text-red-600 bg-red-50',
    refunded: 'text-gray-600 bg-gray-50'
  };
  
  return statusColors[status] || 'text-gray-600 bg-gray-50';
};

export const getStatusLabel = (status: string): string => {
  const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    in_progress: 'Em Andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    paid: 'Pago',
    failed: 'Falhou',
    refunded: 'Reembolsado'
  };
  
  return statusLabels[status] || status;
};