export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  model: LLMModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google';
  endpoint: string;
  description: string;
  pricing: {
    input: number; // per 1M tokens
    output: number; // per 1M tokens
  };
  contextLength: number;
  enabled: boolean;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  selectedModel: LLMModel | null;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
