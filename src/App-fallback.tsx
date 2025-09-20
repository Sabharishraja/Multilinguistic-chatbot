import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Import all your components
import GoogleLoginPage from './components/GoogleLoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Analytics from './components/Analytics';
import DocumentManagement from './components/DocumentManagement';
import QueryManagement from './components/QueryManagement';
import FAQManagement from './components/FAQManagement';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Homepage from './components/website/Homepage';
import Navbar from './components/website/Navbar';
import Footer from './components/website/Footer';
import About from './components/website/About';
import Academics from './components/website/Academics';
import Circulars from './components/website/Circulars';
import StudentPortal from './components/website/StudentPortal';
import Settings from './components/Settings';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're working to fix this issue.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Show Error Details
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded border max-h-40 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Mock Auth Context for components that need it
const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockAuth = {
    isAuthenticated: true,
    user: {
      id: '1',
      username: 'admin',
      email: 'admin@college.edu',
      role: 'admin',
      full_name: 'Admin User'
    },
    loading: false,
    login: async () => {},
    logout: () => {},
    signup: async () => {}
  };

  return (
    <div data-auth-context={JSON.stringify(mockAuth)}>
      {children}
    </div>
  );
};

// Layout component for public pages
function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

// Layout component for authenticated pages
function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}

// Main App Content
function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public website routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="circulars" element={<Circulars />} />
          <Route path="student-portal" element={<StudentPortal />} />
        </Route>

        {/* Authentication routes */}
        <Route path="/login" element={
          <LoginPage 
            onBackToSignUp={() => window.location.href = '/signup'} 
            onSignUpClick={() => window.location.href = '/signup'} 
          />
        } />
        <Route path="/signup" element={
          <SignUpPage 
            onBackToLogin={() => window.location.href = '/login'} 
            onSignUpSuccess={() => window.location.href = '/login'} 
          />
        } />
        <Route path="/admin-login" element={
          <GoogleLoginPage 
            onGoogleLogin={async () => {}} 
            onAdminLogin={async () => {}} 
            onSignUpSuccess={() => {}} 
            loading={false} 
            error={null} 
          />
        } />

        {/* Dashboard routes - accessible for testing */}
        <Route path="/dashboard" element={
          <AuthLayout>
            <MockAuthProvider>
              <UserDashboard />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/admin" element={
          <AuthLayout>
            <MockAuthProvider>
              <AdminDashboard />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/analytics" element={
          <AuthLayout>
            <MockAuthProvider>
              <Analytics />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/documents" element={
          <AuthLayout>
            <MockAuthProvider>
              <DocumentManagement />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/queries" element={
          <AuthLayout>
            <MockAuthProvider>
              <QueryManagement />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/faqs" element={
          <AuthLayout>
            <MockAuthProvider>
              <FAQManagement />
            </MockAuthProvider>
          </AuthLayout>
        } />
        <Route path="/settings" element={
          <AuthLayout>
            <MockAuthProvider>
              <Settings />
            </MockAuthProvider>
          </AuthLayout>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;

