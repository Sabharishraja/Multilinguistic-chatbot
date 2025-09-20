import React from 'react';
import { 
  MessageCircle, 
  FileText, 
  Clock,
  Globe,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import MetricCard from './MetricCard';
import RecentActivity from './RecentActivity';
import LanguageBreakdown from './LanguageBreakdown';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Queries Today',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: MessageCircle,
      color: 'blue' as const
    },
    {
      title: 'Resolved Automatically',
      value: '2,289',
      change: '80.4%',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'green' as const
    },
    {
      title: 'Human Fallback',
      value: '558',
      change: '19.6%',
      changeType: 'negative' as const,
      icon: AlertCircle,
      color: 'yellow' as const
    },
    {
      title: 'Active Languages',
      value: '6',
      change: 'Hindi, English +4',
      changeType: 'neutral' as const,
      icon: Globe,
      color: 'purple' as const
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive' as const,
      icon: Clock,
      color: 'blue' as const
    },
    {
      title: 'Knowledge Base Items',
      value: '1,456',
      change: '+23 today',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'green' as const
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome back! Here's what's happening with your chatbot.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <LanguageBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;