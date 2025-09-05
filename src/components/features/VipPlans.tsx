import React from 'react';
import { Crown, Star, Check, Gift } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';

interface VipPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  interval: 'monthly' | 'quarterly' | 'yearly';
  benefits: string[];
  popular?: boolean;
}

const mockPlans: VipPlan[] = [
  {
    id: 'basic',
    name: 'VIP Básico',
    price: 29.90,
    originalPrice: 39.90,
    interval: 'monthly',
    benefits: [
      '10% desconto em todos os serviços',
      'Prioridade no agendamento',
      'Pontos de fidelidade 1.5x',
      'Atendimento preferencial'
    ]
  },
  {
    id: 'premium',
    name: 'VIP Premium',
    price: 79.90,
    originalPrice: 99.90,
    interval: 'quarterly',
    benefits: [
      '15% desconto em todos os serviços',
      'Agendamento com 30 dias de antecedência',
      'Pontos de fidelidade 2x',
      '1 serviço premium gratuito/mês',
      'Produtos exclusivos com desconto',
      'Atendimento domiciliar prioritário'
    ],
    popular: true
  },
  {
    id: 'elite',
    name: 'VIP Elite',
    price: 249.90,
    originalPrice: 299.90,
    interval: 'yearly',
    benefits: [
      '25% desconto em todos os serviços',
      'Agendamento ilimitado',
      'Pontos de fidelidade 3x',
      '2 serviços premium gratuitos/mês',
      'Kit de produtos mensais gratuitos',
      'Acesso a serviços exclusivos',
      'Atendimento domiciliar gratuito',
      'Consultoria de estilo personalizada'
    ]
  }
];

const VipPlans: React.FC = () => {
  const getIntervalLabel = (interval: string) => {
    const labels = {
      monthly: 'mês',
      quarterly: 'trimestre',
      yearly: 'ano'
    };
    return labels[interval as keyof typeof labels];
  };

  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
    // Implement subscription logic
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-8 h-8 text-yellow-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Planos VIP</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Desfrute de benefícios exclusivos e economize com nossos planos VIP.
          Atendimento premium, descontos especiais e muito mais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-2 border-violet-500 shadow-lg' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="warning" className="px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(plan.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">por {getIntervalLabel(plan.interval)}</p>
              </div>
              
              {plan.originalPrice && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <Gift className="w-4 h-4 mr-1" />
                  Economize {formatCurrency(plan.originalPrice - plan.price)}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              fullWidth
              variant={plan.popular ? 'primary' : 'outline'}
              onClick={() => handleSubscribe(plan.id)}
              className={plan.popular ? 'shadow-lg' : ''}
            >
              {plan.popular ? 'Escolher Plano Popular' : 'Escolher Plano'}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-violet-50 to-cyan-50 border-violet-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Não encontrou o plano ideal?
          </h3>
          <p className="text-gray-600 mb-4">
            Entre em contato conosco para criar um plano personalizado para suas necessidades.
          </p>
          <Button variant="outline">
            Falar com Consultor
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VipPlans;