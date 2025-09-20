import React, { useState } from 'react';
import { User, Lock, Mail, Phone, BookOpen, Calendar, CreditCard, FileText, MessageCircle, Bell, Shield, LogIn } from 'lucide-react';

const StudentPortal: React.FC = () => {
  const [loginType, setLoginType] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const quickServices = [
    {
      title: 'Exam Results',
      description: 'Check your latest exam results and grades',
      icon: BookOpen,
      color: 'bg-blue-500',
      action: 'View Results'
    },
    {
      title: 'Fee Payment',
      description: 'Pay semester fees and view payment history',
      icon: CreditCard,
      color: 'bg-green-500',
      action: 'Pay Now'
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and exam schedules',
      icon: Calendar,
      color: 'bg-purple-500',
      action: 'View Calendar'
    },
    {
      title: 'Library Services',
      description: 'Search books, renew loans, and check due dates',
      icon: FileText,
      color: 'bg-amber-500',
      action: 'Access Library'
    },
    {
      title: 'Hostel Services',
      description: 'Room allocation, mess menu, and complaints',
      icon: User,
      color: 'bg-pink-500',
      action: 'Hostel Portal'
    },
    {
      title: 'Support Chat',
      description: 'Get instant help with our AI chatbot',
      icon: MessageCircle,
      color: 'bg-indigo-500',
      action: 'Start Chat'
    }
  ];

  const announcements = [
    {
      title: 'Semester Registration Open',
      message: 'Register for next semester courses before the deadline',
      time: '2 hours ago',
      type: 'important'
    },
    {
      title: 'Library Extended Hours',
      message: 'Library will remain open 24/7 during exam period',
      time: '1 day ago',
      type: 'info'
    },
    {
      title: 'Placement Drive Update',
      message: 'New companies added to campus recruitment',
      time: '2 days ago',
      type: 'opportunity'
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Portal</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Access your academic information, services, and resources in one place
              </p>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <LogIn className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your portal</p>
              </div>

              {/* Login Type Selector */}
              <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLoginType('student')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'student'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setLoginType('faculty')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginType === 'faculty'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Faculty
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginType === 'student' ? 'Student ID' : 'Employee ID'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={loginType === 'student' ? 'Enter your student ID' : 'Enter your employee ID'}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help? <button className="text-blue-600 hover:text-blue-700">Contact Support</button>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Portal Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need for your academic journey, accessible 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Rahul!</h1>
              <p className="text-gray-600">Student ID: ST2024001 | Computer Science Engineering</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.action}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academic Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Academic Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8.5</div>
                  <div className="text-sm text-gray-600">Current CGPA</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Attendance</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-gray-600">Semester</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 text-sm">{announcement.title}</h4>
                    <p className="text-gray-600 text-xs mt-1">{announcement.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Pending Assignments</span>
                  <span className="font-medium text-gray-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Library Books</span>
                  <span className="font-medium text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Fee Due Date</span>
                  <span className="font-medium text-red-600">Mar 15</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our AI chatbot is available 24/7 to assist you with any queries.
              </p>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;