// API service for authentication
// This would normally make actual HTTP requests to your backend

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    username: string;
    email: string;
    full_name?: string;
    profile_picture?: string;
    role: 'admin' | 'user' | 'moderator';
    is_active: boolean;
    created_at: string;
    last_login?: string;
  };
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface AuthError {
  detail: string;
  error_code?: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8001';
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      let detail = 'Login failed';
      try { const e = await response.json() as AuthError; detail = e.detail || detail; } catch {}
      throw new Error(detail);
    }
    const data = await response.json();
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    return data;
  }

  async googleAuth(token: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      let detail = 'Google authentication failed';
      try { const e = await response.json() as AuthError; detail = e.detail || detail; } catch {}
      throw new Error(detail);
    }
    const data = await response.json();
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('auth_user', JSON.stringify(data.user));
    return data;
  }

  async register(userData: RegisterRequest): Promise<{ message: string; user: any }> {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      let detail = 'Registration failed';
      try { const e = await response.json() as AuthError; detail = e.detail || detail; } catch {}
      throw new Error(detail);
    }
    const data = await response.json();
    // Don't auto-login after registration, just return success message
    return { message: 'Registration successful', user: data.user };
  }

  async logout(): Promise<void> {
    try {
      // In a real app, you might want to invalidate the token on the server
      // For now, we'll just clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No token found');
      }

      // Simulate token refresh
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, you would make a request to refresh the token
      // For demo purposes, we'll return the same token
      const userData = JSON.parse(localStorage.getItem('auth_user') || '{}');
      
      return {
        access_token: token,
        token_type: 'bearer',
        user: userData
      };

      // Real API call would look like this:
      /*
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo password change logic
      if (oldPassword === newPassword) {
        throw new Error('New password must be different from old password');
      }

      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }

      // Real API call would look like this:
      /*
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${this.baseUrl}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        const error: AuthError = await response.json();
        throw new Error(error.detail || 'Password change failed');
      }
      */
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
