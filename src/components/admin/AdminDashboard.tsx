import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import FAQManagement from '../FAQManagement';
import DocumentManagement from '../DocumentManagement';
import Analytics from '../Analytics';
import QueryManagement from '../QueryManagement';
import Settings from '../Settings';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'faq':
        return <FAQManagement />;
      case 'documents':
        return <DocumentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'queries':
        return <QueryManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;