import React from 'react';
import { Globe } from 'lucide-react';

const LanguageBreakdown: React.FC = () => {
  const languages = [
    { name: 'English', percentage: 45, queries: 1281, color: 'bg-blue-500' },
    { name: 'Hindi', percentage: 28, queries: 797, color: 'bg-green-500' },
    { name: 'Marathi', percentage: 12, queries: 342, color: 'bg-purple-500' },
    { name: 'Telugu', percentage: 8, queries: 228, color: 'bg-amber-500' },
    { name: 'Tamil', percentage: 4, queries: 114, color: 'bg-pink-500' },
    { name: 'Gujarati', percentage: 3, queries: 85, color: 'bg-indigo-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Language Usage</h3>
        <Globe className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{lang.name}</span>
              <span className="text-gray-600">{lang.queries} queries</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${lang.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${lang.percentage}%` }}
                ></div>
              </div>
              <span className="absolute right-0 top-3 text-xs text-gray-500">
                {lang.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Today's Total:</span> 2,847 queries across 6 languages
        </p>
      </div>
    </div>
  );
};

export default LanguageBreakdown;