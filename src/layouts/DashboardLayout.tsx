import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Users, 
  Scissors, 
  Package, 
  CreditCard, 
  BarChart3, 
  Settings, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { getInitials } from '../utils/helpers';
import Button from '../components/ui/Button';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: Home },
    { name: 'Agendamentos', href: ROUTES.BOOKINGS, icon: Calendar },
    { name: 'Clientes', href: ROUTES.CLIENTS, icon: Users },
    { name: 'Barbeiros', href: ROUTES.BARBERS, icon: User },
    { name: 'Serviços', href: ROUTES.SERVICES, icon: Scissors },
    { name: 'Produtos', href: ROUTES.PRODUCTS, icon: Package },
    { name: 'Pagamentos', href: ROUTES.PAYMENTS, icon: CreditCard },
    { name: 'Relatórios', href: ROUTES.REPORTS, icon: BarChart3 }
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link
        to={item.href}
        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-violet-100 text-violet-700 shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <item.icon
          className={`mr-3 h-5 w-5 transition-colors duration-200 ${
            isActive ? 'text-violet-500' : 'text-gray-400 group-hover:text-gray-500'
          }`}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-violet-600 rounded-xl">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">BarberPro</h1>
                <p className="text-xs text-gray-500">Sistema de Gestão</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
              icon={<X size={16} />}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 bg-violet-600 rounded-lg text-white font-medium">
                {user ? getInitials(user.name) : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Usuário'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || 'admin'}
                </p>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="mr-3 h-4 w-4" />
                Configurações
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              icon={<Menu size={20} />}
            />
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-violet-600 rounded-lg">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">BarberPro</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;