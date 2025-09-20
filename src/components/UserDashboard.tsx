import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetricCard from './MetricCard';
import { dataService, AnalyticsOverview, Document, Query } from '../services/dataService';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [recentQueries, setRecentQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [analyticsData, documentsData, queriesData] = await Promise.all([
        dataService.getAnalyticsOverview(),
        dataService.getDocuments(0, 5),
        dataService.getQueries(0, 5)
      ]);
      
      setAnalytics(analyticsData);
      setRecentDocuments(analyticsData.recent_documents);
      setRecentQueries(analyticsData.recent_queries);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const metrics = analytics ? [
    {
      title: 'My Documents',
      value: analytics.documents.total.toString(),
      change: `${analytics.documents.processed} processed`,
      changeType: 'positive' as const,
      icon: FileText,
      color: 'blue' as const
    },
    {
      title: 'Total Queries',
      value: analytics.queries.total.toString(),
      change: `${analytics.queries.langchain} via LangChain`,
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'green' as const
    },
    {
      title: 'Active Users',
      value: analytics.users.active.toString(),
      change: `${analytics.users.total} total users`,
      changeType: 'positive' as const,
      icon: Clock,
      color: 'yellow' as const
    },
    {
      title: 'Success Rate',
      value: analytics.documents.total > 0 ? 
        `${Math.round((analytics.documents.processed / analytics.documents.total) * 100)}%` : '0%',
      change: 'Processing rate',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'purple' as const
    }
  ] : [];

  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Add a new document to your collection',
      icon: Upload,
      color: 'blue',
      action: () => console.log('Upload document')
    },
    {
      title: 'Search Documents',
      description: 'Find documents using keywords',
      icon: Search,
      color: 'green',
      action: () => console.log('Search documents')
    },
    {
      title: 'Submit Query',
      description: 'Ask a question or request help',
      icon: MessageSquare,
      color: 'purple',
      action: () => console.log('Submit query')
    },
    {
      title: 'View Help',
      description: 'Access documentation and guides',
      icon: BookOpen,
      color: 'yellow',
      action: () => console.log('View help')
    }
  ];

  const getStatusColor = (isProcessed: boolean) => {
    return isProcessed 
      ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      : 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    return '📄';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
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
            onClick={fetchDashboardData}
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
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}!</h1>
            <p className="text-blue-100 dark:text-blue-200">Here's your personal dashboard overview.</p>
          </div>
          <button
            onClick={fetchDashboardData}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Documents */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Documents</h2>
            <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentDocuments.length > 0 ? (
              recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{getFileTypeIcon(doc.file_type)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{doc.filename}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.file_type} • {dataService.formatFileSize(doc.file_size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.is_processed)}`}>
                      {doc.is_processed ? 'Processed' : 'Processing'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {dataService.formatDate(doc.uploaded_at)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Queries</h2>
            <MessageSquare className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentQueries.length > 0 ? (
              recentQueries.map((query) => (
                <div key={query.id} className="p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                      {query.question}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      query.mode_used === 'langchain' 
                        ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
                        : 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
                    }`}>
                      {query.mode_used}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {dataService.formatDate(query.created_at)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {query.user_id ? 'User Query' : 'System Query'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No queries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 bg-${action.color}-100 dark:bg-${action.color}-900/20`}>
                <action.icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{action.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{action.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips and Help */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <BookOpen className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pro Tip</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Use the search function to quickly find documents by keywords, file type, or upload date. 
              You can also filter your queries by status to track your requests more effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
