import React, { useState } from 'react';
import { Plus, Search, Filter, Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/helpers';

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Pomada Modeladora Premium',
    description: 'Pomada para fixação e brilho duradouro',
    price: 45.00,
    cost: 25.00,
    stock: 15,
    minStock: 5,
    category: 'cosmetic',
    isActive: true,
    sales: 89,
    revenue: 4005,
    profit: 1780,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Refrigerante Lata 350ml',
    description: 'Coca-Cola, Pepsi, Guaraná Antarctica',
    price: 5.00,
    cost: 2.50,
    stock: 48,
    minStock: 20,
    category: 'beverage',
    isActive: true,
    sales: 156,
    revenue: 780,
    profit: 390
  },
  {
    id: '3',
    name: 'Água Mineral 500ml',
    description: 'Água mineral natural sem gás',
    price: 3.00,
    cost: 1.20,
    stock: 2,
    minStock: 15,
    category: 'beverage',
    isActive: true,
    sales: 234,
    revenue: 702,
    profit: 421.20
  },
  {
    id: '4',
    name: 'Pente Profissional',
    description: 'Pente carbono antiestático profissional',
    price: 25.00,
    cost: 12.00,
    stock: 8,
    minStock: 3,
    category: 'accessory',
    isActive: true,
    sales: 23,
    revenue: 575,
    profit: 299
  }
];

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      beverage: 'bg-blue-100 text-blue-800',
      cosmetic: 'bg-violet-100 text-violet-800',
      accessory: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      beverage: 'Bebida',
      cosmetic: 'Cosmético',
      accessory: 'Acessório'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) return { label: 'Baixo', variant: 'danger' as const };
    if (stock <= minStock * 2) return { label: 'Médio', variant: 'warning' as const };
    return { label: 'Bom', variant: 'success' as const };
  };

  const columns = [
    {
      key: 'product',
      label: 'Produto',
      render: (_, product: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500 max-w-xs truncate">{product.description}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Categoria',
      render: (_, product: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
          {getCategoryLabel(product.category)}
        </span>
      )
    },
    {
      key: 'pricing',
      label: 'Preços',
      render: (_, product: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">Venda: {formatCurrency(product.price)}</p>
          <p className="text-gray-600">Custo: {formatCurrency(product.cost)}</p>
          <p className="text-green-600 font-medium">
            Margem: {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
          </p>
        </div>
      )
    },
    {
      key: 'stock',
      label: 'Estoque',
      render: (_, product: any) => {
        const status = getStockStatus(product.stock, product.minStock);
        return (
          <div className="text-sm">
            <p className="font-medium text-gray-900">{product.stock} unidades</p>
            <div className="flex items-center mt-1">
              <Badge variant={status.variant} size="sm">
                {status.label}
              </Badge>
              {product.stock <= product.minStock && (
                <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
              )}
            </div>
          </div>
        );
      }
    },
    {
      key: 'performance',
      label: 'Performance',
      render: (_, product: any) => (
        <div className="text-sm">
          <p className="text-gray-900">{product.sales} vendas</p>
          <p className="text-gray-900">{formatCurrency(product.revenue)} receita</p>
          <p className="text-green-600 font-medium">{formatCurrency(product.profit)} lucro</p>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, product: any) => (
        <Badge variant={product.isActive ? 'success' : 'danger'}>
          {product.isActive ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    }
  ];

  const lowStockProducts = mockProducts.filter(p => p.stock <= p.minStock);
  const totalRevenue = mockProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = mockProducts.reduce((sum, p) => sum + p.profit, 0);

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-500">Gerencie o estoque de produtos da barbearia</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={handleNewProduct}>
          Novo Produto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500 bg-opacity-10">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockProducts.length}</p>
              <p className="text-sm text-gray-500">Total de Produtos</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-red-500 bg-opacity-10">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
              <p className="text-sm text-gray-500">Baixo Estoque</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500 bg-opacity-10">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-gray-500">Receita Total</p>
            </div>
          </div>
        </Card>
        
        <Card className="!p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-violet-500 bg-opacity-10">
              <DollarSign className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
              <p className="text-sm text-gray-500">Lucro Total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Atenção: {lowStockProducts.length} produto(s) com baixo estoque
              </h3>
              <p className="text-red-600">
                {lowStockProducts.map(p => p.name).join(', ')} precisam de reposição
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { category: 'beverage', label: 'Bebidas', count: 2, color: 'bg-blue-500' },
          { category: 'cosmetic', label: 'Cosméticos', count: 1, color: 'bg-violet-500' },
          { category: 'accessory', label: 'Acessórios', count: 1, color: 'bg-green-500' }
        ].map((cat, index) => (
          <Card key={index} className="!p-4 hover:shadow-md transition-shadow cursor-pointer" hover>
            <div className="text-center">
              <div className={`w-12 h-12 ${cat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Package className={`w-6 h-6 ${cat.color.replace('bg-', 'text-')}`} />
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
            placeholder="Buscar produtos..."
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
            <option value="beverage">Bebidas</option>
            <option value="cosmetic">Cosméticos</option>
            <option value="accessory">Acessórios</option>
          </select>
          
          <Button variant="outline" icon={<Filter size={16} />}>
            Filtros Avançados
          </Button>

          <Button variant="secondary">
            Relatório de Estoque
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Table
        columns={columns}
        data={mockProducts}
        emptyMessage="Nenhum produto encontrado"
      />

      {/* Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome do Produto"
              placeholder="Ex: Pomada Modeladora"
              defaultValue={selectedProduct?.name}
            />
            
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 mt-6"
              defaultValue={selectedProduct?.category || 'cosmetic'}
            >
              <option value="beverage">Bebida</option>
              <option value="cosmetic">Cosmético</option>
              <option value="accessory">Acessório</option>
            </select>
          </div>
          
          <Input
            label="Descrição"
            placeholder="Descreva o produto..."
            defaultValue={selectedProduct?.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Preço de Venda (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              defaultValue={selectedProduct?.price}
            />
            
            <Input
              label="Preço de Custo (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              defaultValue={selectedProduct?.cost}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Estoque Atual"
              type="number"
              placeholder="0"
              defaultValue={selectedProduct?.stock}
            />
            
            <Input
              label="Estoque Mínimo"
              type="number"
              placeholder="5"
              defaultValue={selectedProduct?.minStock}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActiveProduct"
              defaultChecked={selectedProduct?.isActive !== false}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
            <label htmlFor="isActiveProduct" className="text-sm text-gray-700">
              Produto ativo
            </label>
          </div>
        </form>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowProductModal(false)}
          >
            Cancelar
          </Button>
          <Button>
            {selectedProduct ? 'Salvar Alterações' : 'Criar Produto'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;