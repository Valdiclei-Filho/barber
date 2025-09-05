import React from 'react';
import { Star, Gift, Award, Crown } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/helpers';

interface LoyaltyProgramProps {
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'vip';
  totalSpent: number;
  nextTierPoints?: number;
}

const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({
  points,
  tier,
  totalSpent,
  nextTierPoints
}) => {
  const getTierInfo = (tierLevel: string) => {
    const tiers = {
      bronze: { 
        name: 'Bronze', 
        color: 'bg-orange-100 text-orange-800',
        icon: Award,
        benefits: ['5% desconto', 'Pontos básicos']
      },
      silver: { 
        name: 'Prata', 
        color: 'bg-gray-100 text-gray-800',
        icon: Star,
        benefits: ['10% desconto', 'Pontos 1.5x', 'Prioridade no agendamento']
      },
      gold: { 
        name: 'Ouro', 
        color: 'bg-yellow-100 text-yellow-800',
        icon: Gift,
        benefits: ['15% desconto', 'Pontos 2x', 'Serviços exclusivos']
      },
      vip: { 
        name: 'VIP', 
        color: 'bg-purple-100 text-purple-800',
        icon: Crown,
        benefits: ['20% desconto', 'Pontos 3x', 'Atendimento premium', 'Produtos gratuitos']
      }
    };
    return tiers[tierLevel as keyof typeof tiers];
  };

  const tierInfo = getTierInfo(tier);
  const progressPercentage = nextTierPoints ? (points / nextTierPoints) * 100 : 100;

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Programa de Fidelidade</h3>
          <Badge className={tierInfo.color}>
            <tierInfo.icon className="w-4 h-4 mr-1" />
            {tierInfo.name}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-violet-50 rounded-lg">
            <p className="text-2xl font-bold text-violet-600">{points}</p>
            <p className="text-sm text-gray-600">Pontos Acumulados</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSpent)}</p>
            <p className="text-sm text-gray-600">Total Gasto</p>
          </div>
        </div>

        {nextTierPoints && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso para próximo nível</span>
              <span>{points}/{nextTierPoints} pontos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Benefícios do nível {tierInfo.name}:</h4>
          <ul className="space-y-1">
            {tierInfo.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default LoyaltyProgram;