import React, { useState } from 'react';
import { Plus, Search, Filter, CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatCurrency, formatDateTime } from '../../utils/helpers';

// Mock data
const mockPayments = [
  {
    id: '1',
    bookingId: 'B001',
    clientName: 'João Silva',
    amount: 75.00,
    method: 'pix',
    status: 'completed',
    transactionId: 'PIX123456789',
    services: ['Corte Masculino', 'Barba Completa'],
    createdAt: new Date('2024-01-15T10:30:00'),
    completedAt: new Date('2024-01-15T10:31:00')
  },
  {
    id: '2',
    bookingId: 'B002',
    clientName: 'Maria Santos',
    amount: 105.00,
    method: 'card',
    status: 'completed',
    transactionId: 'CARD987654321',
    services: ['Corte Feminino', 'Hidratação Capilar'],
    createdAt: new Date('2024-01-15T14:30:00'),
    completedAt: new Date('2024-01-15T14:31:00')
  },
  {
    id: '3',
    bookingId: 'B003',
    clientName: 'Pedro Costa',
    amount: 35.00,
    method: 'cash',
    status: 'completed',
    services: ['Corte Masculino'],
    createdAt: new Date('2024-01-15T16:00:00'),
    completedAt: new Date('2024-01-15T16:00:00')
  },
  {
    id: '4',
    bookingId: 'B004',
    clientName: 'Ana Paula',
    amount: 60.00,
    method: 'boleto',
    status: 'pending',
    transactionId: 'BOL555666777',
    services: ['Hidratação Capilar'],
    createdAt: new Date('2024-01-15T17:00:00')
  },
  {
    id: '5',
    bookingId: null,
    clientName: 'Carlos Lima',
    amount: 25.00,
    method: 'pix',
    status: 'completed',
    transactionId: 'PIX111222333',
    services: ['Pomada Modeladora'],
    type: 'product',
    createdAt: new Date('2024-01-15T18:15:00'),
    completedAt: new Date('2024-01-15T18:16:00')
  }
];

const PaymentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'pix': return '📱';
      case 'card': return '💳';
      case 'cash': return '💵';
      case 'boleto': return '📄';
      default: return '💰';
    }
  };

  const getMethodLabel = (method: string) => {
    const labels = {
      pix: 'PIX',
      card: 'Cartão',
      cash: 'Dinheiro',
      boleto: 'Boleto'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: 'Pago',
      pending: 'Pendente',
      failed: 'Falhou',
      refunded: 'Reembolsado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const columns = [
    {
      key: 'payment',
      label: 'Pagamento',
      render: (_, payment: any) => (
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getMethodIcon(payment.method)}</span>
            <div>
              <p className="font-medium text-gray-900">
                {payment.bookingId ? `Agendamento ${payment.bookingId}` : 'Venda de Produto'}
              </p>
              <p className="text-sm text-gray-500">{payment.clientName}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'services',
      label: 'Itens',
      render: (_, payment: any) => (
        <div className="text-sm">
          {payment.services.map((service: string, index: number) => (
            <p key={index} className="text-gray-900">{service}</p>
          ))}
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (_, payment: any) => (
        <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
      )
    },
    {
      key: 'method',
      label: 'Método',
      render: (_, payment: any) => (
        <div className="flex items-center space-x-2">
          <span>{getMethodIcon(payment.method)}</span>
          <span className="text-sm text-gray-900">{getMethodLabel(payment.method)}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, payment: any) => (
        <Badge variant={getStatusColor(payment.status) as any}>
          {getStatusLabel(payment.status)}
        </Badge>
      )
    },
    {
      key: 'date',
      label: 'Data',
      render: (_, payment: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{formatDateTime(payment.createdAt)}</p>
          {payment.completedAt && (
            <p className="text-green-600">Pago em {formatDateTime(payment.completedAt)}</p>
          )}
        </div>
      )
    },
    {
      key: 'transaction',
      label: 'Transação',
      render: (_, payment: any) => (
        <div className="text-sm">
          {payment.transactionId ? (
            <p className="text-gray-600 font-mono">{payment.transactionId}</p>
          ) : (
            <p className="text-gray-400">-</p>
          )}
        </div>
      )
    }
  ];

  // Calculate stats
  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingAmount = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const todayPayments = mockPayments
    .filter(p => {
      const today = new Date();
      const paymentDate = new Date(p.createdAt);
      return paymentDate.toDateString() === today.toDateString();
    }).length;

  const methodStats = mockPayments.reduce((acc, payment) => {
    if (payment.status === 'completed') {
      acc[payment.method] = (acc[payment.method] || 0) + payment.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
          <p className="text-gray-500">Gerencie todas as transações financeiras</p>
        </div>
        <Button icon={<Plus size={16} />}>
          Registrar Pagamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500 bg-opacity-10">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-gray-500">Receita Confirmada</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-yellow-500 bg-opacity-10">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
              <p className="text-sm text-gray-500">Pendentes</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500 bg-opacity-10">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{todayPayments}</p>
              <p className="text-sm text-gray-500">Hoje</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-violet-500 bg-opacity-10">
              <TrendingUp className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockPayments.length}</p>
              <p className="text-sm text-gray-500">Total de Transações</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(methodStats).map(([method, amount]) => (
          <Card key={method} className="!p-4 hover:shadow-md transition-shadow" hover>
            <div className="text-center">
              <div className="text-2xl mb-2">{getMethodIcon(method)}</div>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(amount)}</p>
              <p className="text-sm text-gray-500">{getMethodLabel(method)}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Buscar por cliente, ID..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todos os métodos</option>
            <option value="pix">PIX</option>
            <option value="card">Cartão</option>
            <option value="cash">Dinheiro</option>
            <option value="boleto">Boleto</option>
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todos os status</option>
            <option value="completed">Pagos</option>
            <option value="pending">Pendentes</option>
            <option value="failed">Falharam</option>
            <option value="refunded">Reembolsados</option>
          </select>
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Período
          </Button>

          <Button variant="secondary">
            Exportar Relatório
          </Button>
        </div>
      </Card>

      {/* Payments Table */}
      <Table
        columns={columns}
        data={mockPayments}
        emptyMessage="Nenhum pagamento encontrado"
      />
    </div>
  );
};

export default PaymentsPage;