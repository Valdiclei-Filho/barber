import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  Package, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import Card from '../../components/ui/Card';
import { formatCurrency } from '../../utils/helpers';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 15000, expenses: 8000 },
  { month: 'Fev', revenue: 18000, expenses: 9000 },
  { month: 'Mar', revenue: 22000, expenses: 10000 },
  { month: 'Abr', revenue: 20000, expenses: 9500 },
  { month: 'Mai', revenue: 25000, expenses: 11000 },
  { month: 'Jun', revenue: 28000, expenses: 12000 },
];

const topServicesData = [
  { name: 'Corte Masculino', bookings: 145, revenue: 5075 },
  { name: 'Barba Completa', bookings: 89, revenue: 2225 },
  { name: 'Combo Corte + Barba', bookings: 67, revenue: 4020 },
  { name: 'Hidratação Capilar', bookings: 34, revenue: 2040 },
];

const DashboardPage: React.FC = () => {
  const stats = [
    {
      name: 'Receita do Mês',
      value: formatCurrency(28000),
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Agendamentos',
      value: '247',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      name: 'Clientes Ativos',
      value: '189',
      change: '+5.1%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-violet-500'
    },
    {
      name: 'Produtos em Estoque',
      value: '45',
      change: '-2.3%',
      changeType: 'decrease' as const,
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  const quickStats = [
    {
      label: 'Agendamentos Hoje',
      value: '12',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      label: 'Faturamento Hoje',
      value: formatCurrency(850),
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Produtos com Baixo Estoque',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Visão geral do seu negócio</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Último acesso</p>
          <p className="text-sm font-medium text-gray-900">Hoje às 14:30</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="!p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Receitas vs Despesas (6 meses)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.8}
                  name="Receita"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.6}
                  name="Despesas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Services */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Serviços Mais Populares
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topServicesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="bookings"
                  fill="#06B6D4"
                  name="Agendamentos"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Atividades Recentes
        </h3>
        <div className="space-y-4">
          {[
            {
              action: 'Novo agendamento',
              description: 'João Silva agendou Corte Masculino para hoje às 15:00',
              time: '5 min atrás',
              type: 'booking'
            },
            {
              action: 'Pagamento recebido',
              description: 'Pagamento de R$ 35,00 de Maria Santos foi confirmado',
              time: '12 min atrás',
              type: 'payment'
            },
            {
              action: 'Produto com baixo estoque',
              description: 'Pomada Modeladora está com apenas 3 unidades',
              time: '1 hora atrás',
              type: 'alert'
            },
            {
              action: 'Serviço concluído',
              description: 'Carlos Oliveira finalizou atendimento com Pedro Costa',
              time: '2 horas atrás',
              type: 'completed'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                activity.type === 'booking' ? 'bg-blue-500' :
                activity.type === 'payment' ? 'bg-green-500' :
                activity.type === 'alert' ? 'bg-red-500' :
                'bg-gray-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;