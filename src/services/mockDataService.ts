// Mock data service that simulates real-time database connections
// This provides realistic data for dashboards when backend is not available

export interface MockAnalyticsOverview {
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

export interface MockFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

class MockDataService {
  private analyticsData: MockAnalyticsOverview;
  private faqData: MockFAQ[];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Initialize with realistic mock data
    this.analyticsData = {
      users: {
        total: 1247,
        active: 89
      },
      documents: {
        total: 156,
        processed: 142
      },
      queries: {
        total: 2847,
        langchain: 2847
      },
      recent_documents: [
        {
          id: '1',
          filename: 'Academic Calendar 2024.pdf',
          file_type: 'application/pdf',
          file_size: 2048576,
          uploaded_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          is_processed: true
        },
        {
          id: '2',
          filename: 'Hostel Rules and Regulations.docx',
          file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          file_size: 1024000,
          uploaded_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          is_processed: true
        },
        {
          id: '3',
          filename: 'Fee Structure 2024.xlsx',
          file_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          file_size: 512000,
          uploaded_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          is_processed: false
        }
      ],
      recent_queries: [
        {
          id: '1',
          question: 'What are the library timings?',
          mode_used: 'langchain',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          user_id: 'user123'
        },
        {
          id: '2',
          question: 'How do I apply for hostel admission?',
          mode_used: 'langchain',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          user_id: 'user456'
        },
        {
          id: '3',
          question: 'What are the fee payment methods?',
          mode_used: 'langchain',
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          user_id: 'user789'
        }
      ]
    };

    this.faqData = [
      {
        id: '1',
        question: 'What are the library timings?',
        answer: 'The library is open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.',
        category: 'library',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        is_active: true
      },
      {
        id: '2',
        question: 'How do I apply for hostel admission?',
        answer: 'You can apply for hostel admission through the online portal. Visit the admissions section and fill out the hostel application form.',
        category: 'hostel',
        created_at: '2024-01-14T15:45:00Z',
        updated_at: '2024-01-14T15:45:00Z',
        is_active: true
      },
      {
        id: '3',
        question: 'What are the fee payment methods?',
        answer: 'You can pay fees online through net banking, credit/debit cards, or UPI. Offline payment is also accepted at the finance office.',
        category: 'fees',
        created_at: '2024-01-13T09:20:00Z',
        updated_at: '2024-01-13T09:20:00Z',
        is_active: true
      },
      {
        id: '4',
        question: 'How can I access my exam results?',
        answer: 'You can access your exam results through the student portal. Log in with your credentials and navigate to the results section.',
        category: 'academics',
        created_at: '2024-01-12T14:15:00Z',
        updated_at: '2024-01-12T14:15:00Z',
        is_active: true
      },
      {
        id: '5',
        question: 'What is the procedure for course registration?',
        answer: 'Course registration opens two weeks before the semester starts. You can register through the student portal during the designated period.',
        category: 'academics',
        created_at: '2024-01-11T11:30:00Z',
        updated_at: '2024-01-11T11:30:00Z',
        is_active: true
      }
    ];

    // Start real-time updates simulation
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    this.updateInterval = setInterval(() => {
      this.simulateRealTimeUpdates();
    }, 30000);
  }

  private simulateRealTimeUpdates() {
    // Simulate some data changes
    const now = new Date();
    
    // Occasionally add new queries
    if (Math.random() < 0.3) {
      const newQuery = {
        id: Date.now().toString(),
        question: this.generateRandomQuestion(),
        mode_used: 'langchain',
        created_at: now.toISOString(),
        user_id: `user${Math.floor(Math.random() * 1000)}`
      };
      
      this.analyticsData.recent_queries.unshift(newQuery);
      this.analyticsData.recent_queries = this.analyticsData.recent_queries.slice(0, 5);
      this.analyticsData.queries.total += 1;
      this.analyticsData.queries.langchain += 1;
    }

    // Occasionally update active users
    if (Math.random() < 0.2) {
      this.analyticsData.users.active = Math.max(50, this.analyticsData.users.active + Math.floor(Math.random() * 10) - 5);
    }

    // Occasionally process documents
    if (Math.random() < 0.1) {
      const unprocessedDocs = this.analyticsData.recent_documents.filter(doc => !doc.is_processed);
      if (unprocessedDocs.length > 0) {
        const doc = unprocessedDocs[0];
        doc.is_processed = true;
        this.analyticsData.documents.processed += 1;
      }
    }
  }

  private generateRandomQuestion(): string {
    const questions = [
      'What are the exam dates for this semester?',
      'How can I contact the placement cell?',
      'What documents are required for admission?',
      'What are the scholarship opportunities?',
      'How do I apply for leave?',
      'What are the canteen timings?',
      'How can I access the WiFi?',
      'What are the sports facilities available?',
      'How do I get my ID card?',
      'What are the parking facilities?'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  async getAnalyticsOverview(): Promise<MockAnalyticsOverview> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...this.analyticsData };
  }

  async getFAQs(): Promise<MockFAQ[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.faqData];
  }

  async addFAQ(faq: Omit<MockFAQ, 'id' | 'created_at' | 'updated_at'>): Promise<MockFAQ> {
    const newFAQ: MockFAQ = {
      ...faq,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.faqData.unshift(newFAQ);
    return newFAQ;
  }

  async updateFAQ(id: string, updates: Partial<MockFAQ>): Promise<MockFAQ | null> {
    const index = this.faqData.findIndex(faq => faq.id === id);
    if (index === -1) return null;
    
    this.faqData[index] = {
      ...this.faqData[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    return this.faqData[index];
  }

  async deleteFAQ(id: string): Promise<boolean> {
    const index = this.faqData.findIndex(faq => faq.id === id);
    if (index === -1) return false;
    
    this.faqData.splice(index, 1);
    return true;
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

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const mockDataService = new MockDataService();
