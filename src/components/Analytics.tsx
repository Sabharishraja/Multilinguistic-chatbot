import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Download, TrendingUp, Users, MessageCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { dataService, AnalyticsOverview } from '../services/dataService';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const fetchAnalytics = useMemo(() => async () => {
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
  }, []);

  const chartData = [
    { day: 'Mon', queries: 2400, resolved: 1920, fallback: 480 },
    { day: 'Tue', queries: 2800, resolved: 2240, fallback: 560 },
    { day: 'Wed', queries: 2200, resolved: 1760, fallback: 440 },
    { day: 'Thu', queries: 3100, resolved: 2480, fallback: 620 },
    { day: 'Fri', queries: 2900, resolved: 2320, fallback: 580 },
    { day: 'Sat', queries: 2100, resolved: 1680, fallback: 420 },
    { day: 'Sun', queries: 1800, resolved: 1440, fallback: 360 }
  ];

  const topQueries = [
    { query: 'Library timings', count: 234, trend: '+12%' },
    { query: 'Hostel admission process', count: 189, trend: '+8%' },
    { query: 'Fee payment methods', count: 167, trend: '+15%' },
    { query: 'Exam schedule', count: 142, trend: '+5%' },
    { query: 'Campus facilities', count: 98, trend: '-3%' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Analytics</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button 
            onClick={fetchAnalytics}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Queries</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.queries.total || 0}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                {analytics?.queries.langchain || 0} via LangChain
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Documents Processed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.documents.processed || 0}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                of {analytics?.documents.total || 0} total
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.users.active || 0}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                of {analytics?.users.total || 0} total
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {analytics?.documents.total ? 
                  Math.round((analytics.documents.processed / analytics.documents.total) * 100) : 0}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Processing efficiency
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Query Volume Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Query Volume Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${(data.resolved / 3500) * 200}px` }}
                    title={`Resolved: ${data.resolved}`}
                  ></div>
                  <div 
                    className="bg-red-500 rounded-b"
                    style={{ height: `${(data.fallback / 3500) * 200}px` }}
                    title={`Fallback: ${data.fallback}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Resolved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Human Fallback</span>
            </div>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Most Asked Questions</h3>
          <div className="space-y-4">
            {topQueries.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.query}</p>
                    <p className="text-sm text-gray-500">{item.count} queries</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">High Performing</h4>
            <p className="text-sm text-green-700">
              Library and hostel related queries have 95%+ resolution rate
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <h4 className="font-semibold text-amber-800 mb-2">Needs Attention</h4>
            <p className="text-sm text-amber-700">
              Fee payment queries have increased fallback rate (25%)
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Trending Up</h4>
            <p className="text-sm text-blue-700">
              Regional language usage increased by 30% this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;