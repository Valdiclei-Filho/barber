import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock } from 'lucide-react';

import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória')
});

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  return (
    <AuthLayout
      title="Entre na sua conta"
      subtitle="Gerencie sua barbearia de forma profissional"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Sua senha"
          icon={<Lock size={16} />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Lembrar de mim
            </label>
          </div>

          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-violet-600 hover:text-violet-500 font-medium"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Entrar
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Cadastre-se grátis
            </Link>
          </span>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Credenciais de demonstração:</p>
          <p className="text-sm text-gray-600">Email: admin@barbershop.com</p>
          <p className="text-sm text-gray-600">Senha: admin123</p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;