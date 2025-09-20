import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, FileText, Bell, Tag } from 'lucide-react';

const Circulars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const circulars = [
    {
      id: 1,
      title: 'Semester End Examination Schedule 2024',
      category: 'Examinations',
      date: '2024-01-15',
      type: 'Important',
      size: '2.4 MB',
      downloads: 1247,
      description: 'Complete schedule for semester end examinations including dates, timings, and venue details.',
      isNew: true
    },
    {
      id: 2,
      title: 'Fee Payment Guidelines and Deadlines',
      category: 'Finance',
      date: '2024-01-12',
      type: 'Notice',
      size: '1.8 MB',
      downloads: 2156,
      description: 'Updated guidelines for fee payment methods, deadlines, and late fee policies.',
      isNew: true
    },
    {
      id: 3,
      title: 'Hostel Accommodation Rules and Regulations',
      category: 'Hostel',
      date: '2024-01-10',
      type: 'Policy',
      size: '3.2 MB',
      downloads: 589,
      description: 'Comprehensive guide to hostel rules, regulations, and accommodation procedures.',
      isNew: false
    },
    {
      id: 4,
      title: 'Library Timings and Access Guidelines',
      category: 'Library',
      date: '2024-01-08',
      type: 'Information',
      size: '1.2 MB',
      downloads: 834,
      description: 'Updated library timings, access rules, and digital resource information.',
      isNew: false
    },
    {
      id: 5,
      title: 'Placement Drive Schedule - TCS Recruitment',
      category: 'Placements',
      date: '2024-01-05',
      type: 'Opportunity',
      size: '956 KB',
      downloads: 1456,
      description: 'Details about upcoming TCS placement drive including eligibility and registration process.',
      isNew: false
    },
    {
      id: 6,
      title: 'Annual Tech Fest 2024 - Registration Open',
      category: 'Events',
      date: '2024-01-03',
      type: 'Event',
      size: '2.1 MB',
      downloads: 892,
      description: 'Information about annual tech fest events, competitions, and registration procedures.',
      isNew: false
    }
  ];

  const categories = ['all', 'Examinations', 'Finance', 'Hostel', 'Library', 'Placements', 'Events'];
  const dateRanges = ['all', 'today', 'week', 'month'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Important':
        return 'bg-red-100 text-red-800';
      case 'Notice':
        return 'bg-blue-100 text-blue-800';
      case 'Policy':
        return 'bg-purple-100 text-purple-800';
      case 'Information':
        return 'bg-green-100 text-green-800';
      case 'Opportunity':
        return 'bg-amber-100 text-amber-800';
      case 'Event':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || circular.category === categoryFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const circularDate = new Date(circular.date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - circularDate.getTime()) / (1000 * 3600 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Circulars & Notices</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest announcements, policies, and important information
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search circulars and notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredCirculars.length}</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{filteredCirculars.filter(c => c.isNew).length}</div>
              <div className="text-sm text-gray-600">New This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {filteredCirculars.reduce((sum, c) => sum + c.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Circulars List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredCirculars.map((circular) => (
              <div key={circular.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{circular.title}</h3>
                        {circular.isNew && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Bell className="w-3 h-3 mr-1" />
                            New
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{circular.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(circular.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{circular.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{circular.size}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{circular.downloads.toLocaleString()} downloads</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3 ml-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(circular.type)}`}>
                        {circular.type}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">Preview</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCirculars.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No circulars found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get instant notifications for new circulars and important announcements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Circulars;