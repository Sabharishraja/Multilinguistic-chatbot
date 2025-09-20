import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Settings, Globe, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showLanguages, setShowLanguages] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Circulars', path: '/circulars' },
    { name: 'Student Portal', path: '/student-portal' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <nav className="glass-strong sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-large group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                TechEdu College
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                Excellence in Education
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift ${
                  isActive(item.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-soft'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-dark-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Selector & Auth Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 dark:bg-dark-800 hover:bg-neutral-200 dark:hover:bg-dark-700 rounded-xl transition-colors focus-ring"
              >
                <span className="text-lg">{currentLanguage?.flag}</span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {currentLanguage?.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${showLanguages ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguages && (
                <div className="absolute right-0 mt-2 w-48 card-glass shadow-large rounded-xl overflow-hidden animate-scale-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguages(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-neutral-100 dark:hover:bg-dark-700 transition-colors ${
                        language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link
              to="/login"
              className="btn-ghost text-sm"
            >
              Login
            </Link>
            
            <Link
              to="/signup"
              className="btn-primary text-sm"
            >
              Sign Up
            </Link>
            
            <Link
              to="/admin-login"
              className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 dark:bg-dark-800 hover:bg-neutral-200 dark:hover:bg-dark-700 rounded-xl transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-dark-800 transition-colors focus-ring"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-dark-700 animate-slide-down">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-dark-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-neutral-200 dark:border-dark-700 mt-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full input text-sm"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 btn-ghost text-center"
                    >
                      Login
                    </Link>
                    
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 btn-primary text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                  
                  <Link
                    to="/admin-login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-neutral-100 dark:bg-dark-800 hover:bg-neutral-200 dark:hover:bg-dark-700 rounded-xl transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;