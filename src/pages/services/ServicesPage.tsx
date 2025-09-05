import React, { useState } from 'react';
import { Plus, Search, Filter, Scissors, Clock, DollarSign, Image as ImageIcon } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/helpers';

// Mock data
const mockServices = [
  {
    id: '1',
    name: 'Corte Masculino Clássico',
    description: 'Corte tradicional masculino com acabamento perfeito',
    price: 35.00,
    duration: 30,
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'hair',
    isActive: true,
    bookings: 145,
    revenue: 5075,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Barba Completa',
    description: 'Aparar, modelar e finalizar a barba com produtos premium',
    price: 25.00,
    duration: 20,
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beard',
    isActive: true,
    bookings: 89,
    revenue: 2225,
    createdAt: new Date('2023-01-20')
  },
  {
    id: '3',
    name: 'Combo Premium',
    description: 'Corte + Barba + Sobrancelha + Tratamento capilar',
    price: 75.00,
    duration: 60,
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'combo',
    isActive: true,
    bookings: 67,
    revenue: 5025,
    createdAt: new Date('2023-02-01')
  },
  {
    id: '4',
    name: 'Hidratação Capilar',
    description: 'Tratamento profissional para cabelos ressecados',
    price: 60.00,
    duration: 45,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'treatment',
    isActive: true,
    bookings: 34,
    revenue: 2040,
    createdAt: new Date('2023-02-15')
  }
];

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      hair: 'bg-blue-100 text-blue-800',
      beard: 'bg-green-100 text-green-800',
      combo: 'bg-violet-100 text-violet-800',
      treatment: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      hair: 'Cabelo',
      beard: 'Barba',
      combo: 'Combo',
      treatment: 'Tratamento'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const columns = [
    {
      key: 'service',
      label: 'Serviço',
      render: (_, service: any) => (
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {service.image ? (
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{service.name}</p>
            <p className="text-sm text-gray-500 max-w-xs truncate">{service.description}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Categoria',
      render: (_, service: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
          {getCategoryLabel(service.category)}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Preço',
      render: (_, service: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">{formatCurrency(service.price)}</p>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duração',
      render: (_, service: any) => (
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          {service.duration}min
        </div>
      )
    },
    {
      key: 'performance',
      label: 'Performance',
      render: (_, service: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{service.bookings} agendamentos</p>
          <p className="text-gray-900 font-medium">{formatCurrency(service.revenue)} receita</p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, service: any) => (
        <Badge variant={service.isActive ? 'success' : 'danger'}>
          {service.isActive ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const handleEditService = (service: any) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleNewService = () => {
    setSelectedService(null);
    setShowServiceModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
          <p className="text-gray-500">Gerencie o catálogo de serviços da barbearia</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={handleNewService}>
          Novo Serviço
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Serviços', value: '15', color: 'bg-blue-500', icon: Scissors },
          { label: 'Serviços Ativos', value: '12', color: 'bg-green-500', icon: Plus },
          { label: 'Receita Total', value: formatCurrency(14365), color: 'bg-violet-500', icon: DollarSign },
          { label: 'Mais Popular', value: 'Corte Masculino', color: 'bg-orange-500', icon: Clock, isText: true }
        ].map((stat, index) => (
          <Card key={index} className="!p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className={`${stat.isText ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Service Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { category: 'hair', label: 'Cabelo', count: 6, color: 'bg-blue-500' },
          { category: 'beard', label: 'Barba', count: 4, color: 'bg-green-500' },
          { category: 'combo', label: 'Combos', count: 3, color: 'bg-violet-500' },
          { category: 'treatment', label: 'Tratamentos', count: 2, color: 'bg-orange-500' }
        ].map((cat, index) => (
          <Card key={index} className="!p-4 hover:shadow-md transition-shadow cursor-pointer" hover>
            <div className="text-center">
              <div className={`w-12 h-12 ${cat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Scissors className={`w-6 h-6 ${cat.color.replace('bg-', 'text-')}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{cat.count}</p>
              <p className="text-sm text-gray-500">{cat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Buscar serviços..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Todas as categorias</option>
            <option value="hair">Cabelo</option>
            <option value="beard">Barba</option>
            <option value="combo">Combos</option>
            <option value="treatment">Tratamentos</option>
          </select>
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Filtros Avançados
          </Button>

          <Button variant="secondary">
            Relatório de Serviços
          </Button>
        </div>
      </Card>

      {/* Services Table */}
      <Table
        columns={columns}
        data={mockServices}
        emptyMessage="Nenhum serviço encontrado"
      />

      {/* Service Modal */}
      <Modal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        title={selectedService ? 'Editar Serviço' : 'Novo Serviço'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome do Serviço"
              placeholder="Ex: Corte Masculino"
              defaultValue={selectedService?.name}
            />
            
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 mt-6"
              defaultValue={selectedService?.category || 'hair'}
            >
              <option value="hair">Cabelo</option>
              <option value="beard">Barba</option>
              <option value="combo">Combo</option>
              <option value="treatment">Tratamento</option>
            </select>
          </div>
          
          <Input
            label="Descrição"
            placeholder="Descreva o serviço..."
            defaultValue={selectedService?.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              defaultValue={selectedService?.price}
            />
            
            <Input
              label="Duração (minutos)"
              type="number"
              placeholder="30"
              defaultValue={selectedService?.duration}
            />
          </div>
          
          <Input
            label="URL da Imagem"
            placeholder="https://exemplo.com/imagem.jpg"
            defaultValue={selectedService?.image}
          />
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              defaultChecked={selectedService?.isActive !== false}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Serviço ativo
            </label>
          </div>
        </form>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowServiceModal(false)}
          >
            Cancelar
          </Button>
          <Button>
            {selectedService ? 'Salvar Alterações' : 'Criar Serviço'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ServicesPage;