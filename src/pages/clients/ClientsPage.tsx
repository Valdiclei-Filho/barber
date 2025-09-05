import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Star, DollarSign, Calendar } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatCurrency, formatDate, getInitials } from '../../utils/helpers';

// Mock data
const mockClients = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    loyaltyPoints: 150,
    isVip: true,
    totalSpent: 750,
    lastVisit: new Date('2024-01-10'),
    totalBookings: 15,
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 88888-8888',
    loyaltyPoints: 89,
    isVip: false,
    totalSpent: 425,
    lastVisit: new Date('2024-01-08'),
    totalBookings: 8,
    createdAt: new Date('2023-09-22')
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '(11) 77777-7777',
    loyaltyPoints: 234,
    isVip: true,
    totalSpent: 1250,
    lastVisit: new Date('2024-01-12'),
    totalBookings: 22,
    createdAt: new Date('2023-03-10')
  }
];

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const columns = [
    {
      key: 'client',
      label: 'Cliente',
      render: (_, client: any) => (
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full text-violet-700 font-medium">
            {getInitials(client.name)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{client.name}</p>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Telefone',
      render: (_, client: any) => client.phone
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, client: any) => (
        <div className="space-y-1">
          {client.isVip && (
            <Badge variant="warning" size="sm">
              <Star size={12} className="mr-1" />
              VIP
            </Badge>
          )}
          <p className="text-sm text-gray-600">{client.loyaltyPoints} pontos</p>
        </div>
      )
    },
    {
      key: 'stats',
      label: 'Estatísticas',
      render: (_, client: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{client.totalBookings} agendamentos</p>
          <p className="text-gray-900 font-medium">{formatCurrency(client.totalSpent)} gastos</p>
        </div>
      )
    },
    {
      key: 'lastVisit',
      label: 'Última Visita',
      render: (_, client: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{formatDate(client.lastVisit)}</p>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Cliente Desde',
      render: (_, client: any) => (
        <div className="text-sm text-gray-600">
          {formatDate(client.createdAt)}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500">Gerencie sua base de clientes</p>
        </div>
        <Button icon={<Plus size={16} />}>
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Clientes', value: '189', color: 'bg-blue-500', icon: Users },
          { label: 'Clientes VIP', value: '23', color: 'bg-yellow-500', icon: Star },
          { label: 'Receita Total', value: formatCurrency(15750), color: 'bg-green-500', icon: DollarSign },
          { label: 'Novos (Este Mês)', value: '12', color: 'bg-violet-500', icon: Calendar }
        ].map((stat, index) => (
          <Card key={index} className="!p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Buscar por nome, email, telefone..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todos os clientes</option>
            <option value="vip">Apenas VIP</option>
            <option value="regular">Clientes Regulares</option>
            <option value="new">Novos Clientes</option>
          </select>
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Filtros Avançados
          </Button>

          <Button variant="secondary">
            Exportar Lista
          </Button>
        </div>
      </Card>

      {/* Clients Table */}
      <Table
        columns={columns}
        data={mockClients}
        emptyMessage="Nenhum cliente encontrado"
      />
    </div>
  );
};

export default ClientsPage;