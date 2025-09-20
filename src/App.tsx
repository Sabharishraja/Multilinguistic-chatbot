import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Backend Connection Test Component with Checkpoints
const BackendStatus: React.FC = () => {
  const [status, setStatus] = React.useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = React.useState('');
  const [connectionId, setConnectionId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const establishConnection = async () => {
      try {
        console.log('🔄 Attempting to connect to backend...');
        
        // Step 1: Test basic connection
        const testResponse = await fetch('http://127.0.0.1:8000/api/test');
        if (!testResponse.ok) {
          throw new Error('Backend test failed');
        }
        console.log('✅ Backend test successful');

        // Step 2: Register frontend connection (checkpoint)
        const connectResponse = await fetch('http://127.0.0.1:8000/api/frontend/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (connectResponse.ok) {
          const connectData = await connectResponse.json();
          console.log('✅ Frontend connection registered:', connectData);
          setStatus('connected');
          setMessage('Frontend connected to backend');
          setConnectionId(connectData.connection_id);
          
          // Start heartbeat to maintain connection
          startHeartbeat();
        } else {
          const errorText = await connectResponse.text();
          console.error('❌ Connection registration failed:', errorText);
          throw new Error('Failed to register frontend connection');
        }
      } catch (error) {
        console.error('❌ Connection error:', error);
        setStatus('error');
        setMessage('Cannot connect to backend. Make sure it\'s running on port 8000');
      }
    };

    const startHeartbeat = () => {
      console.log('💓 Starting heartbeat...');
      // Send heartbeat every 30 seconds
      const heartbeatInterval = setInterval(async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/frontend/heartbeat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          if (response.ok) {
            console.log('💓 Heartbeat sent successfully');
          } else {
            console.error('💓 Heartbeat failed:', response.status);
          }
        } catch (error) {
          console.error('💓 Heartbeat error:', error);
          setStatus('error');
          setMessage('Lost connection to backend');
          clearInterval(heartbeatInterval);
        }
      }, 30000);

      // Cleanup on unmount
      return () => {
        console.log('💓 Stopping heartbeat...');
        clearInterval(heartbeatInterval);
      };
    };

    establishConnection();
  }, []);

  return (
    <div className="p-4 text-center">
      <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
        status === 'connected' ? 'bg-green-100 text-green-800' :
        status === 'error' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        <span className="mr-2">
          {status === 'connected' ? '✅' : status === 'error' ? '❌' : '⏳'}
        </span>
        <div className="text-left">
          <div>{status === 'checking' ? 'Checking backend...' : message}</div>
          {connectionId && (
            <div className="text-xs opacity-75">Connection ID: {connectionId}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// VoiceRecorder component with fallback
const VoiceRecorder: React.FC = () => {
  const [text, setText] = React.useState("");
  const [listening, setListening] = React.useState(false);

  const startListening = () => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('Speech recognition not supported in this browser');
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setListening(false);

        // Send recognized text to backend
        fetch("http://127.0.0.1:8000/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: transcript }),
        }).then(response => {
          if (response.ok) {
            console.log('Voice sent to backend successfully');
          } else {
            console.error('Backend error:', response.status);
          }
        }).catch(err => {
          console.error('Backend not available:', err);
          alert('Cannot connect to backend. Please make sure it\'s running.');
        });
      };

      recognition.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
        setListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Voice recognition error:', error);
      setListening(false);
    }
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={startListening}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
        disabled={listening}
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>
      {text && <p className="mt-4 text-lg">Recognized: {text}</p>}
    </div>
  );
};

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
            <p className="text-gray-600 mb-6">
              The application encountered an error. This might be due to missing files or configuration issues.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => {
                  // Try to go to a simpler route
                  window.location.href = '/';
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Go to Home
              </button>
            </div>
            
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Show Error Details
                </summary>
                <div className="bg-red-50 p-4 rounded border">
                  <p className="text-sm text-red-800 font-semibold mb-2">Error Message:</p>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap break-words">
                    {this.state.error.message}
                  </pre>
                  <p className="text-sm text-red-800 font-semibold mb-2 mt-3">Stack Trace:</p>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap break-words max-h-32 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p>If this error persists, please check:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• All dependencies are installed (npm install)</li>
                <li>• Backend server is running (python -m uvicorn app.main:app)</li>
                <li>• No missing files in the project</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple Homepage Component
const Homepage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to TechEdu College
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your educational journey starts here. Access courses, manage documents, and connect with your academic community.
        </p>
        
        {/* Backend Connection Status */}
        <div className="mb-6">
          <BackendStatus />
        </div>
        
        {/* Voice Recorder Component */}
        <div className="mb-8">
          <VoiceRecorder />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Student Dashboard
          </a>
          <a
            href="/admin"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
          >
            Admin Dashboard
          </a>
          <a
            href="/faqs"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold"
          >
            FAQ Management
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Simple Dashboard Component
const Dashboard = ({ title, color }: { title: string; color: string }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className={`text-4xl font-bold text-${color}-600 mb-6`}>
          {title}
        </h1>
        
        {/* Backend Connection Status */}
        <div className="mb-6">
          <BackendStatus />
        </div>
        
        {/* Voice Recorder Component */}
        <div className="mb-8">
          <VoiceRecorder />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-blue-500">89 active</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Documents</h3>
            <p className="text-3xl font-bold text-green-600">156</p>
            <p className="text-sm text-green-500">142 processed</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Queries</h3>
            <p className="text-3xl font-bold text-purple-600">2,847</p>
            <p className="text-sm text-purple-500">All via LangChain</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">Document uploaded: Academic Calendar 2024.pdf</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">New query: What are the library timings?</span>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">User registered: john.doe@college.edu</span>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Simple FAQ Component
const FAQPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">FAQ Management</h1>
        
        {/* Voice Recorder Component */}
        <div className="mb-8">
          <VoiceRecorder />
        </div>
        
        <div className="mb-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New FAQ
          </button>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What are the library timings?
            </h3>
            <p className="text-gray-600 mb-2">
              The library is open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.
            </p>
            <div className="flex gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">library</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              How do I apply for hostel admission?
            </h3>
            <p className="text-gray-600 mb-2">
              You can apply for hostel admission through the online portal. Visit the admissions section and fill out the hostel application form.
            </p>
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">hostel</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What are the fee payment methods?
            </h3>
            <p className="text-gray-600 mb-2">
              You can pay fees online through net banking, credit/debit cards, or UPI. Offline payment is also accepted at the finance office.
            </p>
            <div className="flex gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">fees</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard title="Student Dashboard" color="blue" />} />
          <Route path="/admin" element={<Dashboard title="Admin Dashboard" color="green" />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;