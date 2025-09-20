import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}) => {
  const colorClasses = {
    blue: 'from-primary-500 to-primary-600',
    green: 'from-success-500 to-success-600',
    yellow: 'from-warning-500 to-warning-600',
    red: 'from-error-500 to-error-600',
    purple: 'from-secondary-500 to-secondary-600'
  };

  const trendIcons = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: Minus
  };

  const trendColors = {
    positive: 'text-success-600 dark:text-success-400',
    negative: 'text-error-600 dark:text-error-400',
    neutral: 'text-neutral-600 dark:text-neutral-400'
  };

  const TrendIcon = trendIcons[changeType];

  return (
    <div className="card-hover p-6 group animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            {title}
          </p>
          <p className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4 group-hover:scale-105 transition-transform">
            {value}
          </p>
          <div className="flex items-center space-x-2">
            <TrendIcon className={`w-4 h-4 ${trendColors[changeType]}`} />
            <span className={`text-sm font-medium ${trendColors[changeType]}`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`p-4 bg-gradient-to-br ${colorClasses[color]} rounded-2xl shadow-large group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;