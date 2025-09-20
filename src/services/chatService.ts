export type ChatMode = 'auto' | 'rasa' | 'langchain';

export interface ChatRequestPayload {
  message: string;
  user_id?: string;
  language?: string; // e.g., 'en', 'hi'
  mode?: ChatMode;
}

export interface ChatResponsePayload {
  response: string;
  lang: string;
  mode_used: 'rasa' | 'langchain';
  intent?: string;
  confidence?: number;
}

class ChatService {
  private baseUrl: string;

  constructor() {
    // Direct backend URL
    this.baseUrl = 'http://127.0.0.1:8001';
  }

  async sendMessage(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    const res = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Chat API error (${res.status})`);
    }
    return res.json();
  }

  async health(): Promise<any> {
    const res = await fetch(`${this.baseUrl}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  }
}

export const chatService = new ChatService();





