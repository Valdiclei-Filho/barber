import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Star, DollarSign, Clock } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatCurrency, getInitials } from '../../utils/helpers';

// Mock data
const mockBarbers = [
  {
    id: '1',
    name: 'Carlos Santos',
    email: 'carlos.santos@barberpro.com',
    phone: '(11) 99999-0001',
    specialties: ['Corte Masculino', 'Barba'],
    commissionRate: 60,
    workingHours: {
      monday: { start: '09:00', end: '18:00', isWorking: true },
      tuesday: { start: '09:00', end: '18:00', isWorking: true },
      wednesday: { start: '09:00', end: '18:00', isWorking: true },
      thursday: { start: '09:00', end: '18:00', isWorking: true },
      friday: { start: '09:00', end: '18:00', isWorking: true },
      saturday: { start: '08:00', end: '16:00', isWorking: true },
      sunday: { start: '00:00', end: '00:00', isWorking: false }
    },
    isActive: true,
    totalEarnings: 15750,
    monthlyBookings: 87,
    rating: 4.9,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Ana Paula Silva',
    email: 'ana.paula@barberpro.com',
    phone: '(11) 99999-0002',
    specialties: ['Corte Feminino', 'Hidratação', 'Coloração'],
    commissionRate: 65,
    workingHours: {
      monday: { start: '10:00', end: '19:00', isWorking: true },
      tuesday: { start: '10:00', end: '19:00', isWorking: true },
      wednesday: { start: '10:00', end: '19:00', isWorking: true },
      thursday: { start: '10:00', end: '19:00', isWorking: true },
      friday: { start: '10:00', end: '19:00', isWorking: true },
      saturday: { start: '09:00', end: '17:00', isWorking: true },
      sunday: { start: '00:00', end: '00:00', isWorking: false }
    },
    isActive: true,
    totalEarnings: 18950,
    monthlyBookings: 72,
    rating: 4.8,
    createdAt: new Date('2023-03-20')
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@barberpro.com',
    phone: '(11) 99999-0003',
    specialties: ['Corte Masculino', 'Barba', 'Bigode'],
    commissionRate: 55,
    workingHours: {
      monday: { start: '08:00', end: '17:00', isWorking: true },
      tuesday: { start: '08:00', end: '17:00', isWorking: true },
      wednesday: { start: '00:00', end: '00:00', isWorking: false },
      thursday: { start: '08:00', end: '17:00', isWorking: true },
      friday: { start: '08:00', end: '17:00', isWorking: true },
      saturday: { start: '08:00', end: '16:00', isWorking: true },
      sunday: { start: '08:00', end: '14:00', isWorking: true }
    },
    isActive: true,
    totalEarnings: 12340,
    monthlyBookings: 65,
    rating: 4.7,
    createdAt: new Date('2023-05-10')
  }
];

const BarbersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const columns = [
    {
      key: 'barber',
      label: 'Barbeiro',
      render: (_, barber: any) => (
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full text-violet-700 font-medium">
            {getInitials(barber.name)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900">{barber.name}</p>
              {barber.rating >= 4.8 && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500">{barber.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Telefone',
      render: (_, barber: any) => barber.phone
    },
    {
      key: 'specialties',
      label: 'Especialidades',
      render: (_, barber: any) => (
        <div className="space-y-1">
          {barber.specialties.slice(0, 2).map((specialty: string, index: number) => (
            <Badge key={index} variant="info" size="sm">
              {specialty}
            </Badge>
          ))}
          {barber.specialties.length > 2 && (
            <span className="text-xs text-gray-500">
              +{barber.specialties.length - 2} mais
            </span>
          )}
        </div>
      )
    },
    {
      key: 'commission',
      label: 'Comissão',
      render: (_, barber: any) => (
        <span className="text-sm font-medium text-gray-900">
          {barber.commissionRate}%
        </span>
      )
    },
    {
      key: 'performance',
      label: 'Performance',
      render: (_, barber: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{barber.monthlyBookings} agendamentos</p>
          <p className="text-gray-900 font-medium">{formatCurrency(barber.totalEarnings)}</p>
          <div className="flex items-center mt-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
            <span className="text-xs text-gray-600">{barber.rating}</span>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, barber: any) => (
        <Badge variant={barber.isActive ? 'success' : 'danger'}>
          {barber.isActive ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Barbeiros</h1>
          <p className="text-gray-500">Gerencie sua equipe de profissionais</p>
        </div>
        <Button icon={<Plus size={16} />}>
          Novo Barbeiro
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total de Barbeiros', 
            value: '8', 
            color: 'bg-blue-500', 
            icon: Users 
          },
          { 
            label: 'Ativos Hoje', 
            value: '6', 
            color: 'bg-green-500', 
            icon: Clock 
          },
          { 
            label: 'Comissão Média', 
            value: '62%', 
            color: 'bg-violet-500', 
            icon: DollarSign 
          },
          { 
            label: 'Avaliação Média', 
            value: '4.8', 
            color: 'bg-yellow-500', 
            icon: Star 
          }
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
            placeholder="Buscar por nome, email..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todos os barbeiros</option>
            <option value="active">Apenas Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="top-rated">Melhor Avaliados</option>
          </select>
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Filtros Avançados
          </Button>

          <Button variant="secondary">
            Relatório de Comissões
          </Button>
        </div>
      </Card>

      {/* Barbers Table */}
      <Table
        columns={columns}
        data={mockBarbers}
        emptyMessage="Nenhum barbeiro encontrado"
      />
    </div>
  );
};

export default BarbersPage;