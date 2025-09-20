import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Save,
  X
} from 'lucide-react';
import { mockDataService, MockFAQ } from '../services/mockDataService';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

const FAQManagement: React.FC = () => {
  const [faqs, setFaqs] = useState<MockFAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<MockFAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general'
  });

  // Load FAQs from mock data service
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockDataService.getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error('Error loading FAQs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'library', label: 'Library' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'fees', label: 'Fees' },
    { value: 'academics', label: 'Academics' },
    { value: 'exams', label: 'Exams' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFaq = async () => {
    try {
      const newFaq = await mockDataService.addFAQ({
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        is_active: true
      });
      
      setFaqs([newFaq, ...faqs]);
      setFormData({ question: '', answer: '', category: 'general' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding FAQ:', err);
      setError('Failed to add FAQ');
    }
  };

  const handleEditFaq = (faq: MockFAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    });
  };

  const handleUpdateFaq = async () => {
    if (!editingFaq) return;
    
    try {
      const updatedFaq = await mockDataService.updateFAQ(editingFaq.id, {
        question: formData.question,
        answer: formData.answer,
        category: formData.category
      });
      
      if (updatedFaq) {
        setFaqs(faqs.map(faq => 
          faq.id === editingFaq.id ? updatedFaq : faq
        ));
      }
      
      setEditingFaq(null);
      setFormData({ question: '', answer: '', category: 'general' });
    } catch (err) {
      console.error('Error updating FAQ:', err);
      setError('Failed to update FAQ');
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const success = await mockDataService.deleteFAQ(id);
        if (success) {
          setFaqs(faqs.filter(faq => faq.id !== id));
        }
      } catch (err) {
        console.error('Error deleting FAQ:', err);
        setError('Failed to delete FAQ');
      }
    }
  };

  const toggleFaqStatus = async (id: string) => {
    try {
      const faq = faqs.find(f => f.id === id);
      if (faq) {
        const updatedFaq = await mockDataService.updateFAQ(id, {
          is_active: !faq.is_active
        });
        
        if (updatedFaq) {
          setFaqs(faqs.map(f => f.id === id ? updatedFaq : f));
        }
      }
    } catch (err) {
      console.error('Error toggling FAQ status:', err);
      setError('Failed to update FAQ status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FAQ Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage frequently asked questions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </button>
        <button
            onClick={loadFAQs}
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
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          </div>
        </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingFaq) && (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="Enter the question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Answer
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="Enter the answer..."
              />
            </div>
                      <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              >
                {categories.slice(1).map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
                        </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={editingFaq ? handleUpdateFaq : handleAddFaq}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingFaq ? 'Update' : 'Add'} FAQ
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingFaq(null);
                  setFormData({ question: '', answer: '', category: 'general' });
                }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
                        </div>
                      </div>
                    </div>
      )}

      {/* FAQs List */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            FAQs ({filteredFaqs.length})
          </h2>
        </div>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No FAQs found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Add your first FAQ to get started'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {faq.category}
                    </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${
                        faq.is_active 
                          ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
                          : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
                      }`}>
                        {faq.is_active ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>{faq.is_active ? 'Active' : 'Inactive'}</span>
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {faq.answer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Updated {new Date(faq.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditFaq(faq)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFaqStatus(faq.id)}
                      className={`p-2 transition-colors ${
                        faq.is_active 
                          ? 'text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                          : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                      }`}
                    >
                      {faq.is_active ? <X className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                </div>
              </div>
              ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default FAQManagement;