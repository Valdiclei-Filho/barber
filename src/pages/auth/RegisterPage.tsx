import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User, Mail, Lock, Phone } from 'lucide-react';

import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  phone: yup
    .string()
    .min(10, 'Telefone inválido')
    .required('Telefone é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória')
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser, isAuthenticated, loading } = useAuth();
  
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
    const { confirmPassword, ...userData } = data;
    await registerUser(userData);
  };

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece a gerenciar sua barbearia hoje mesmo"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome completo"
          type="text"
          placeholder="Seu nome completo"
          icon={<User size={16} />}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          icon={<Phone size={16} />}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Crie uma senha"
          icon={<Lock size={16} />}
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Confirme sua senha"
          icon={<Lock size={16} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          className="mt-6"
        >
          Criar conta
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Faça login
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;