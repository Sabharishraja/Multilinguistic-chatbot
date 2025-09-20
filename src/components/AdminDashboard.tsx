import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Activity,
  Database,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetricCard from './MetricCard';
import RecentActivity from './RecentActivity';
import LanguageBreakdown from './LanguageBreakdown';
import { chatService } from '../services/chatService';
import { dataService, AnalyticsOverview } from '../services/dataService';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAnalyticsOverview();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const metrics = analytics ? [
    {
      title: 'Total Users',
      value: analytics.users.total.toString(),
      change: `${analytics.users.active} active`,
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue' as const
    },
    {
      title: 'Total Documents',
      value: analytics.documents.total.toString(),
      change: `${analytics.documents.processed} processed`,
      changeType: 'positive' as const,
      icon: FileText,
      color: 'green' as const
    },
    {
      title: 'Total Queries',
      value: analytics.queries.total.toString(),
      change: `${analytics.queries.langchain} via LangChain`,
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'yellow' as const
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: 'Operational',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'purple' as const
    }
  ] : [];

  const recentActivities = analytics ? [
    ...analytics.recent_documents.slice(0, 2).map((doc, index) => ({
      id: `doc_${doc.id}`,
      type: 'document_upload',
      message: `Document "${doc.filename}" uploaded`,
      timestamp: dataService.formatDate(doc.uploaded_at),
      icon: FileText,
      color: 'green'
    })),
    ...analytics.recent_queries.slice(0, 2).map((query, index) => ({
      id: `query_${query.id}`,
      type: 'query_asked',
      message: `Query: "${query.question.substring(0, 50)}..."`,
      timestamp: dataService.formatDate(query.created_at),
      icon: MessageSquare,
      color: 'blue'
    }))
  ] : [];

  const languageData = [
    { language: 'English', count: 1250, percentage: 45 },
    { language: 'Spanish', count: 890, percentage: 32 },
    { language: 'French', count: 420, percentage: 15 },
    { language: 'German', count: 280, percentage: 8 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-dark-900">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-600 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-neutral-900 dark:text-white mb-2">Loading admin dashboard...</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Fetching real-time data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-dark-900">
        <div className="text-center max-w-md">
          <div className="p-4 bg-error-100 dark:bg-error-900/20 rounded-2xl mb-6 inline-block">
            <AlertCircle className="h-12 w-12 text-error-600 dark:text-error-400" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="btn-primary"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-mesh rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-medium">Admin Dashboard</span>
              </div>
              <h1 className="text-4xl font-display font-bold mb-3">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-white/90 text-lg">
                Here's what's happening with your system today.
              </p>
            </div>
            <button
              onClick={fetchAnalyticsData}
              className="btn-outline border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-bounce-subtle"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-lg animate-pulse-soft"></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-xl">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Recent Activity</h2>
              </div>
            </div>
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Language Breakdown */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-100 dark:bg-secondary-900/20 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Language Distribution</h2>
              </div>
            </div>
            <LanguageBreakdown data={languageData} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group flex items-center p-6 border-2 border-neutral-200 dark:border-dark-600 rounded-2xl hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200 hover-lift">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Manage Users
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Add, edit, or remove users
                </div>
              </div>
            </button>
            
            <button className="group flex items-center p-6 border-2 border-neutral-200 dark:border-dark-600 rounded-2xl hover:border-success-300 dark:hover:border-success-600 hover:bg-success-50 dark:hover:bg-success-900/10 transition-all duration-200 hover-lift">
              <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-success-600 dark:text-success-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors">
                  Upload Documents
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Add new documents to the system
                </div>
              </div>
            </button>
            
            <button className="group flex items-center p-6 border-2 border-neutral-200 dark:border-dark-600 rounded-2xl hover:border-secondary-300 dark:hover:border-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-900/10 transition-all duration-200 hover-lift">
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform">
                <Settings className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                  System Settings
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Configure system preferences
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="card p-6 animate-fade-in">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-accent-100 dark:bg-accent-900/20 rounded-xl">
              <Shield className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">System Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-success-50 dark:bg-success-900/10 rounded-2xl border border-success-200 dark:border-success-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-2xl mb-4">
                <Database className="h-8 w-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Database</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="status-online"></div>
                <span className="text-sm font-medium text-success-600 dark:text-success-400">Operational</span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-success-50 dark:bg-success-900/10 rounded-2xl border border-success-200 dark:border-success-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-2xl mb-4">
                <Activity className="h-8 w-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">API Server</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="status-online"></div>
                <span className="text-sm font-medium text-success-600 dark:text-success-400">Operational</span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-warning-50 dark:bg-warning-900/10 rounded-2xl border border-warning-200 dark:border-warning-800">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warning-100 dark:bg-warning-900/20 rounded-2xl mb-4">
                <TrendingUp className="h-8 w-8 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Cache</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="status-busy"></div>
                <span className="text-sm font-medium text-warning-600 dark:text-warning-400">Degraded</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-dark-700 pt-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Connectivity Test</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  try {
                    const h = await chatService.health();
                    alert(`Health: ${JSON.stringify(h)}`);
                  } catch (e: any) {
                    alert(`Health failed: ${e?.message || e}`);
                  }
                }}
                className="btn-primary text-sm"
              >
                Check Backend Health
              </button>
              <button
                onClick={async () => {
                  try {
                    const resp = await chatService.sendMessage({ message: 'test', language: 'en', mode: 'rasa' });
                    alert(`Rasa: ${resp.response}`);
                  } catch (e: any) {
                    alert(`Rasa test failed: ${e?.message || e}`);
                  }
                }}
                className="btn-secondary text-sm"
              >
                Test Rasa
              </button>
              <button
                onClick={async () => {
                  try {
                    const resp = await chatService.sendMessage({ message: 'What is in the circulars?', language: 'en', mode: 'langchain' });
                    alert(`LangChain: ${resp.response}`);
                  } catch (e: any) {
                    alert(`LangChain test failed: ${e?.message || e}`);
                  }
                }}
                className="btn-outline text-sm"
              >
                Test LangChain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;