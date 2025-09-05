import React from 'react';
import { Scissors } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-violet-600 rounded-xl">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BarberPro</h1>
                <p className="text-sm text-gray-500">Sistema de Gestão</p>
              </div>
            </div>
          </div>
          
          <h2 className="mt-8 text-2xl font-bold text-center text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-center text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;