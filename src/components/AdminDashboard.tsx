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
  RefreshCw
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mx-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
            <p className="text-indigo-100 dark:text-indigo-200">Here's what's happening with your system today.</p>
          </div>
          <button
            onClick={fetchAnalyticsData}
            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Language Breakdown */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Language Distribution</h2>
            <BarChart3 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <LanguageBreakdown data={languageData} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Manage Users</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Add, edit, or remove users</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
            <FileText className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Upload Documents</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Add new documents to the system</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
            <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">System Settings</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Configure system preferences</div>
            </div>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">Database</h3>
            <p className="text-sm text-green-600 dark:text-green-400">Operational</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">API Server</h3>
            <p className="text-sm text-green-600 dark:text-green-400">Operational</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">Cache</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Degraded</p>
          </div>
        </div>
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Connectivity Test</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                try {
                  const h = await chatService.health();
                  alert(`Health: ${JSON.stringify(h)}`);
                } catch (e: any) {
                  alert(`Health failed: ${e?.message || e}`);
                }
              }}
              className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Test LangChain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
