import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Bot,
  Calendar
} from 'lucide-react';
import { dataService, Query } from '../services/dataService';

const QueryManagement: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'langchain' | 'rasa'>('all');
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dataService.getQueries(0, 100);
      setQueries(response.queries);
    } catch (err) {
      console.error('Error fetching queries:', err);
      setError(err instanceof Error ? err.message : 'Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.response.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'all' || query.mode_used === filterMode;
    return matchesSearch && matchesFilter;
  });

  const getModeIcon = (mode: string) => {
    if (mode === 'langchain') {
      return <Bot className="h-4 w-4 text-blue-500" />;
    }
    return <MessageSquare className="h-4 w-4 text-green-500" />;
  };

  const getModeColor = (mode: string) => {
    if (mode === 'langchain') {
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    }
    return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading queries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Query Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor and manage user queries</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchQueries}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Modes</option>
            <option value="langchain">LangChain</option>
            <option value="rasa">Rasa</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500 mr-2" />
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Queries List */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Queries ({filteredQueries.length})
          </h2>
        </div>
        
        {filteredQueries.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No queries found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'No queries have been submitted yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            {filteredQueries.map((query) => (
              <div 
                key={query.id} 
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors cursor-pointer"
                onClick={() => setSelectedQuery(query)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getModeColor(query.mode_used)}`}>
                        {getModeIcon(query.mode_used)}
                        <span>{query.mode_used}</span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {dataService.formatDate(query.created_at)}
                      </span>
                      {query.user_id && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          User Query
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {query.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {query.response}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Query Details</h3>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question
                </label>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-dark-700 p-3 rounded-lg">
                  {selectedQuery.question}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Response
                </label>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-dark-700 p-3 rounded-lg">
                  {selectedQuery.response}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mode Used
                  </label>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-2 w-fit ${getModeColor(selectedQuery.mode_used)}`}>
                    {getModeIcon(selectedQuery.mode_used)}
                    <span>{selectedQuery.mode_used}</span>
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Created At
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {dataService.formatDate(selectedQuery.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryManagement;