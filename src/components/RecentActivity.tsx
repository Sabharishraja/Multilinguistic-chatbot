import React from 'react';
import { Clock, MessageSquare, FileText, User, AlertTriangle } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'query',
      message: 'Student asked about admission deadlines in Hindi',
      time: '2 minutes ago',
      status: 'resolved',
      language: 'Hindi'
    },
    {
      id: 2,
      type: 'document',
      message: 'New circular uploaded: "Semester Exam Schedule"',
      time: '15 minutes ago',
      status: 'success',
      language: 'English'
    },
    {
      id: 3,
      type: 'fallback',
      message: 'Query escalated to human agent - Fee payment issue',
      time: '23 minutes ago',
      status: 'pending',
      language: 'English'
    },
    {
      id: 4,
      type: 'query',
      message: 'Student asked about hostel rules in Marathi',
      time: '34 minutes ago',
      status: 'resolved',
      language: 'Marathi'
    },
    {
      id: 5,
      type: 'query',
      message: 'Multiple students asking about library timings',
      time: '1 hour ago',
      status: 'resolved',
      language: 'English'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'query':
        return MessageSquare;
      case 'document':
        return FileText;
      case 'fallback':
        return AlertTriangle;
      default:
        return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'success':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{activity.language}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;