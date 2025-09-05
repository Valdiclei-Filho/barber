import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, Users, DollarSign, Package, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { formatCurrency } from '../../utils/helpers';

// Mock data for charts
const monthlyRevenueData = [
  { month: 'Jul', revenue: 18000, expenses: 12000, profit: 6000, bookings: 156 },
  { month: 'Ago', revenue: 22000, expenses: 13500, profit: 8500, bookings: 189 },
  { month: 'Set', revenue: 19500, expenses: 12800, profit: 6700, bookings: 167 },
  { month: 'Out', revenue: 25000, expenses: 15000, profit: 10000, bookings: 203 },
  { month: 'Nov', revenue: 28000, expenses: 16500, profit: 11500, bookings: 234 },
  { month: 'Dez', revenue: 32000, expenses: 18000, profit: 14000, bookings: 267 }
];

const serviceDistributionData = [
  { name: 'Corte Masculino', value: 45, color: '#8B5CF6' },
  { name: 'Barba Completa', value: 23, color: '#06B6D4' },
  { name: 'Combo Premium', value: 18, color: '#10B981' },
  { name: 'Hidratação', value: 14, color: '#F59E0B' }
];

const paymentMethodData = [
  { method: 'PIX', amount: 15400, percentage: 48.5 },
  { method: 'Cartão', amount: 12300, percentage: 38.7 },
  { method: 'Dinheiro', amount: 3200, percentage: 10.1 },
  { method: 'Boleto', amount: 850, percentage: 2.7 }
];

const topClientsData = [
  { name: 'João Silva', visits: 15, spent: 750, lastVisit: '2024-01-15' },
  { name: 'Maria Santos', visits: 12, spent: 680, lastVisit: '2024-01-14' },
  { name: 'Pedro Costa', visits: 18, spent: 920, lastVisit: '2024-01-13' },
  { name: 'Ana Paula', visits: 9, spent: 540, lastVisit: '2024-01-12' },
  { name: 'Carlos Lima', visits: 11, spent: 595, lastVisit: '2024-01-11' }
];

const barberPerformanceData = [
  { name: 'Carlos Santos', bookings: 87, revenue: 15750, commission: 9450, rating: 4.9 },
  { name: 'Ana Paula', bookings: 72, revenue: 18950, commission: 12317, rating: 4.8 },
  { name: 'Pedro Costa', bookings: 65, revenue: 12340, commission: 6787, rating: 4.7 },
  { name: 'Maria Silva', bookings: 54, revenue: 9870, commission: 5922, rating: 4.6 }
];

const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('financial');

  const kpiCards = [
    {
      title: 'Receita Total',
      value: formatCurrency(144500),
      change: '+23.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Lucro Líquido',
      value: formatCurrency(56700),
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-violet-500'
    },
    {
      title: 'Total de Clientes',
      value: '1,247',
      change: '+15.8%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Agendamentos',
      value: '1,416',
      change: '+12.1%',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'bg-cyan-500'
    }
  ];

  const exportReport = (type: string) => {
    // In a real application, this would generate and download the report
    console.log(`Exporting ${type} report...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-500">Análises detalhadas do desempenho da barbearia</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="1month">Último mês</option>
            <option value="3months">3 meses</option>
            <option value="6months">6 meses</option>
            <option value="1year">1 ano</option>
          </select>
          <Button variant="outline" icon={<Download size={16} />} onClick={() => exportReport('comprehensive')}>
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="!p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs período anterior</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${kpi.color} bg-opacity-10`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Type Selection */}
      <Card className="!p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'financial', label: 'Financeiro', icon: DollarSign },
            { key: 'services', label: 'Serviços', icon: BarChart3 },
            { key: 'clients', label: 'Clientes', icon: Users },
            { key: 'barbers', label: 'Barbeiros', icon: Users },
            { key: 'products', label: 'Produtos', icon: Package }
          ].map((report) => (
            <button
              key={report.key}
              onClick={() => setSelectedReport(report.key)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedReport === report.key
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <report.icon className="w-4 h-4 mr-2" />
              {report.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Receita vs Despesas</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('revenue')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData}>
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

        {/* Service Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição de Serviços</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('services')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bookings Trend */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tendência de Agendamentos</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('bookings')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                  name="Agendamentos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Métodos de Pagamento</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('payments')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="space-y-4">
            {paymentMethodData.map((method, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-violet-500 rounded" style={{
                    backgroundColor: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][index]
                  }}></div>
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(method.amount)}</p>
                  <p className="text-xs text-gray-500">{method.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performers Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Clientes</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('top-clients')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Visitas</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Gasto Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topClientsData.map((client, index) => (
                  <tr key={index}>
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-600">{client.visits}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(client.spent)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Barber Performance */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance dos Barbeiros</h3>
            <Button variant="ghost" size="sm" onClick={() => exportReport('barber-performance')}>
              <Download size={14} />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Barbeiro</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Agendamentos</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Receita</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Comissão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {barberPerformanceData.map((barber, index) => (
                  <tr key={index}>
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-900">{barber.name}</p>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-600">{barber.bookings}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-900">{formatCurrency(barber.revenue)}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium text-green-600">{formatCurrency(barber.commission)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;