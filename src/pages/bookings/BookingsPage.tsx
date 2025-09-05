import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, User, Scissors } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatDateTime, formatCurrency, getStatusColor, getStatusLabel } from '../../utils/helpers';

// Mock data
const mockBookings = [
  {
    id: '1',
    client: { name: 'João Silva', phone: '(11) 99999-9999' },
    barber: { name: 'Carlos Santos' },
    services: [{ name: 'Corte Masculino', price: 35 }],
    date: new Date('2024-01-15T10:00:00'),
    status: 'confirmed',
    totalPrice: 35,
    paymentStatus: 'pending'
  },
  {
    id: '2',
    client: { name: 'Maria Santos', phone: '(11) 88888-8888' },
    barber: { name: 'Pedro Costa' },
    services: [
      { name: 'Corte Feminino', price: 45 },
      { name: 'Hidratação', price: 60 }
    ],
    date: new Date('2024-01-15T14:30:00'),
    status: 'in_progress',
    totalPrice: 105,
    paymentStatus: 'paid'
  },
  {
    id: '3',
    client: { name: 'Ricardo Lima', phone: '(11) 77777-7777' },
    barber: { name: 'Ana Paula' },
    services: [{ name: 'Barba Completa', price: 25 }],
    date: new Date('2024-01-15T16:00:00'),
    status: 'pending',
    totalPrice: 25,
    paymentStatus: 'pending'
  }
];

const BookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const columns = [
    {
      key: 'client',
      label: 'Cliente',
      render: (_, booking: any) => (
        <div>
          <p className="font-medium text-gray-900">{booking.client.name}</p>
          <p className="text-sm text-gray-500">{booking.client.phone}</p>
        </div>
      )
    },
    {
      key: 'barber',
      label: 'Barbeiro',
      render: (_, booking: any) => booking.barber.name
    },
    {
      key: 'services',
      label: 'Serviços',
      render: (_, booking: any) => (
        <div>
          {booking.services.map((service: any, index: number) => (
            <div key={index} className="text-sm">
              <span className="text-gray-900">{service.name}</span>
              <span className="text-gray-500 ml-2">{formatCurrency(service.price)}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'date',
      label: 'Data/Hora',
      render: (_, booking: any) => (
        <div>
          <p className="text-gray-900">{formatDateTime(booking.date)}</p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, booking: any) => (
        <Badge
          variant={
            booking.status === 'completed' ? 'success' :
            booking.status === 'confirmed' ? 'info' :
            booking.status === 'in_progress' ? 'warning' :
            booking.status === 'cancelled' ? 'danger' :
            'default'
          }
        >
          {getStatusLabel(booking.status)}
        </Badge>
      )
    },
    {
      key: 'total',
      label: 'Total',
      render: (_, booking: any) => (
        <div>
          <p className="font-medium text-gray-900">{formatCurrency(booking.totalPrice)}</p>
          <Badge
            variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
            size="sm"
          >
            {booking.paymentStatus === 'paid' ? 'Pago' : 'Pendente'}
          </Badge>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-500">Gerencie todos os agendamentos da barbearia</p>
        </div>
        <Button icon={<Plus size={16} />}>
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Hoje', value: '12', color: 'bg-blue-500', icon: Calendar },
          { label: 'Esta Semana', value: '47', color: 'bg-green-500', icon: Clock },
          { label: 'Confirmados', value: '35', color: 'bg-violet-500', icon: User },
          { label: 'Pendentes', value: '8', color: 'bg-orange-500', icon: Scissors }
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
            placeholder="Buscar cliente, barbeiro..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="in_progress">Em Andamento</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
          
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Filtros Avançados
          </Button>
        </div>
      </Card>

      {/* Bookings Table */}
      <Table
        columns={columns}
        data={mockBookings}
        emptyMessage="Nenhum agendamento encontrado"
      />
    </div>
  );
};

export default BookingsPage;