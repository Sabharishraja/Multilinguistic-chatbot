// Data service for fetching real data from the backend
import { mockDataService, MockAnalyticsOverview, MockFAQ } from './mockDataService';

export interface AnalyticsOverview {
  users: {
    total: number;
    active: number;
  };
  documents: {
    total: number;
    processed: number;
  };
  queries: {
    total: number;
    langchain: number;
  };
  recent_documents: Array<{
    id: string;
    filename: string;
    file_type: string;
    file_size: number;
    uploaded_at: string;
    is_processed: boolean;
  }>;
  recent_queries: Array<{
    id: string;
    question: string;
    mode_used: string;
    created_at: string;
    user_id?: string;
  }>;
}

export interface Document {
  id: string;
  filename: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  is_processed: boolean;
  uploaded_by: string;
}

export interface Query {
  id: string;
  question: string;
  response: string;
  mode_used: string;
  created_at: string;
  user_id?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

// Simple cache to improve performance
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

class DataService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8001';
  }

  private getCachedData<T>(key: string): T | null {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData<T>(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() });
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    const cacheKey = 'analytics_overview';
    const cached = this.getCachedData<AnalyticsOverview>(cacheKey);
    if (cached) return cached;
    
    try {
      const data = await this.request<AnalyticsOverview>('/api/analytics/overview');
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.warn('Backend not available, using mock data:', error);
      // Fallback to mock data when backend is not available
      const mockData = await mockDataService.getAnalyticsOverview();
      this.setCachedData(cacheKey, mockData);
      return mockData;
    }
  }

  async getDocuments(skip: number = 0, limit: number = 20): Promise<{
    documents: Document[];
    total: number;
    skip: number;
    limit: number;
  }> {
    return this.request(`/api/documents?skip=${skip}&limit=${limit}`);
  }

  async getQueries(skip: number = 0, limit: number = 20): Promise<{
    queries: Query[];
    total: number;
    skip: number;
    limit: number;
  }> {
    return this.request(`/api/queries?skip=${skip}&limit=${limit}`);
  }

  async getUsers(skip: number = 0, limit: number = 20): Promise<{
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }> {
    return this.request(`/api/users?skip=${skip}&limit=${limit}`);
  }

  async uploadDocument(file: File): Promise<{ status: string; message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/upload-document`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  }
}

export const dataService = new DataService();
