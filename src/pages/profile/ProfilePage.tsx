import React, { useState } from 'react';
import { User, Lock, Bell, CreditCard, Shield, Smartphone, Mail } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'billing', label: 'Faturamento', icon: CreditCard }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex items-center justify-center w-24 h-24 bg-violet-100 rounded-full text-violet-700 text-2xl font-bold">
          {user ? getInitials(user.name) : 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Usuário'}</h2>
          <p className="text-gray-500">{user?.email || 'email@exemplo.com'}</p>
          <p className="text-sm text-gray-400 capitalize">
            {user?.role === 'admin' ? 'Administrador' : user?.role || 'Usuário'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </Button>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo"
            defaultValue={user?.name || ''}
            disabled={!isEditing}
          />
          <Input
            label="Email"
            type="email"
            defaultValue={user?.email || ''}
            disabled={!isEditing}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Telefone"
            defaultValue={user?.phone || ''}
            disabled={!isEditing}
          />
          <select
            disabled={!isEditing}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-50 mt-6"
            defaultValue={user?.role || 'admin'}
          >
            <option value="admin">Administrador</option>
            <option value="barber">Barbeiro</option>
            <option value="client">Cliente</option>
          </select>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button>
              Salvar Alterações
            </Button>
          </div>
        )}
      </form>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alterar Senha</h3>
        <form className="space-y-4 max-w-md">
          <Input
            label="Senha Atual"
            type="password"
          />
          <Input
            label="Nova Senha"
            type="password"
          />
          <Input
            label="Confirmar Nova Senha"
            type="password"
          />
          <Button>
            Alterar Senha
          </Button>
        </form>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Autenticação de Dois Fatores</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Proteja sua conta com autenticação de dois fatores
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            Configurar 2FA
          </Button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sessões Ativas</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome - Windows', location: 'São Paulo, SP', current: true },
            { device: 'Mobile App - iOS', location: 'São Paulo, SP', current: false },
            { device: 'Firefox - Windows', location: 'Rio de Janeiro, RJ', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">{session.location}</p>
              </div>
              <div className="flex items-center space-x-3">
                {session.current && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Sessão Atual
                  </span>
                )}
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Revogar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferências de Notificação</h3>
        
        <div className="space-y-4">
          {[
            {
              title: 'Notificações por Email',
              description: 'Receber notificações importantes por email',
              icon: Mail,
              enabled: true
            },
            {
              title: 'Notificações Push',
              description: 'Receber notificações no navegador',
              icon: Bell,
              enabled: true
            },
            {
              title: 'Notificações SMS',
              description: 'Receber alertas importantes via SMS',
              icon: Smartphone,
              enabled: false
            }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <notification.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={notification.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tipos de Notificação</h3>
        
        <div className="space-y-3">
          {[
            'Novos agendamentos',
            'Cancelamentos',
            'Pagamentos recebidos',
            'Produtos com baixo estoque',
            'Relatórios semanais',
            'Atualizações do sistema'
          ].map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-900">{type}</span>
              <input
                type="checkbox"
                defaultChecked={index < 4}
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Plano Atual</h3>
        <Card className="border-2 border-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-900">Plano Professional</h4>
              <p className="text-gray-500">Funcionalidades completas para sua barbearia</p>
              <p className="text-2xl font-bold text-violet-600 mt-2">R$ 99,90/mês</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Ativo
              </span>
              <p className="text-sm text-gray-500 mt-1">Renovação em 15/02/2024</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Método de Pagamento</h3>
        <Card>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">****</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expira em 12/26</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            Alterar Cartão
          </Button>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Faturas</h3>
        <div className="space-y-3">
          {[
            { date: '15/01/2024', amount: 'R$ 99,90', status: 'Pago', invoice: 'INV-001' },
            { date: '15/12/2023', amount: 'R$ 99,90', status: 'Pago', invoice: 'INV-002' },
            { date: '15/11/2023', amount: 'R$ 99,90', status: 'Pago', invoice: 'INV-003' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{invoice.invoice}</p>
                <p className="text-sm text-gray-500">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{invoice.amount}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {invoice.status}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500">Gerencie suas preferências e configurações de conta</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <Card>
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'security' && renderSecurityTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'billing' && renderBillingTab()}
      </Card>
    </div>
  );
};

export default ProfilePage;