import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, GraduationCap, CheckCircle } from 'lucide-react';
import SignUpPage from './SignUpPage';

interface LoginFormData {
  email: string;
  password: string;
}

interface GoogleLoginPageProps {
  onGoogleLogin: (token: string) => Promise<void>;
  onAdminLogin: (email: string, password: string) => Promise<void>;
  onSignUpSuccess: (user: any) => void;
  loading: boolean;
  error: string | null;
}

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

const GoogleLoginPage: React.FC<GoogleLoginPageProps> = ({ 
  onGoogleLogin, 
  onAdminLogin, 
  onSignUpSuccess,
  loading, 
  error 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<LoginFormData>>({});
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Load Google OAuth script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        setGoogleLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google OAuth script loaded');
        setGoogleLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  // Initialize Google OAuth
  useEffect(() => {
    if (googleLoaded && window.google) {
      console.log('Initializing Google OAuth with client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '683758755926-lf1jg0dmq2n9tscaa5gg3h3din4mch2g.apps.googleusercontent.com',
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      console.log('Google OAuth initialized successfully');
    }
  }, [googleLoaded]);

  const handleGoogleResponse = async (response: any) => {
    try {
      console.log('Google OAuth response received:', response);
      if (response.credential) {
        console.log('Sending credential to backend...');
        await onGoogleLogin(response.credential);
        console.log('Google login successful!');
      } else {
        console.error('No credential in Google OAuth response:', response);
      }
    } catch (err) {
      console.error('Google login error:', err);
      // Show error to user
      const errorMessage = err instanceof Error ? err.message : 'Google authentication failed';
      setGoogleError(errorMessage);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onAdminLogin(formData.email, formData.password);
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    } catch (err) {
      console.error('Admin login error:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof LoginFormData]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const renderGoogleButton = () => {
    if (!googleLoaded) {
      return (
        <div className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm bg-white dark:bg-dark-700">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
        </div>
      );
    }

    return (
      <div 
        id="google-signin-button" 
        className="w-full"
        onClick={() => {
          if (window.google) {
            window.google.accounts.id.prompt();
          }
        }}
      >
        <div className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 cursor-pointer transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sign in with Google
          </span>
        </div>
      </div>
    );
  };

  // Show sign-up page if in sign-up mode
  if (isSignUpMode) {
    return (
      <SignUpPage 
        onBackToLogin={() => setIsSignUpMode(false)}
        onSignUpSuccess={onSignUpSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-900 dark:to-dark-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Student Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Sign in with your educational email to continue
          </p>
        </div>

        {/* Login Options */}
        <div className="bg-white dark:bg-dark-800 py-8 px-6 shadow-xl rounded-lg border border-gray-200 dark:border-dark-700">
          
          {/* Google OAuth Section */}
          {!isAdminMode && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Student Login
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Use your educational email (.edu, .ac.in, .edu.in, rajalakshmi.edu.in, etc.)
                </p>
              </div>

              {googleError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500 mr-2" />
                  <span className="text-sm text-red-600 dark:text-red-400">{googleError}</span>
                </div>
              )}

              {renderGoogleButton()}

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Don't have an account?
                </p>
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(true)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
                >
                  Create Account
                </button>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Or use{' '}
                    <button
                      type="button"
                      onClick={() => window.location.href = '/app'}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline"
                    >
                      regular login
                    </button>
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-dark-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400">
                    Admin Access
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAdminMode(true)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-dark-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-800"
              >
                Admin Login
              </button>
            </div>
          )}

          {/* Admin Login Section */}
          {isAdminMode && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Admin Login
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdminMode(false)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  ← Back to Student Login
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Success Message */}
                {loginSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 dark:text-green-500 mr-2" />
                    <span className="text-sm text-green-600 dark:text-green-400">Login successful! Redirecting to admin dashboard...</span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500 mr-2" />
                    <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        validationErrors.email ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-dark-600'
                      }`}
                      placeholder="Enter admin email"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        validationErrors.password ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-dark-600'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                      )}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In as Admin'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only educational email addresses are accepted for student login
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supported domains: .edu, .ac.in, .edu.in, rajalakshmi.edu.in, university, college, school
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
