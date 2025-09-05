import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, ArrowLeft } from 'lucide-react';

import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório')
});

interface FormData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    await forgotPassword(data.email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <AuthLayout
        title="Email enviado!"
        subtitle="Verifique sua caixa de entrada para redefinir sua senha"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          
          <p className="text-gray-600">
            Enviamos um link de recuperação de senha para seu email.
            Verifique sua caixa de entrada e siga as instruções.
          </p>
          
          <div className="pt-4">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center text-violet-600 hover:text-violet-500 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Digite seu email para receber as instruções de recuperação"
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

        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Enviar link de recuperação
        </Button>

        <div className="text-center">
          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;