// 사용자 타입
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  api_keys?: UserApiKey[];
  created_at: string;
  updated_at: string;
}

// 사용자 API 키 관리
export interface UserApiKey {
  id: string;
  user_id: string;
  provider: LLMProvider;
  key_name: string;
  encrypted_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 채팅 세션
export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  model_provider: LLMProvider;
  model_name: string;
  system_prompt?: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

// 채팅 메시지
export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  model_provider?: LLMProvider;
  model_name?: string;
  tokens_used?: number;
  cost?: number;
  created_at: string;
}

// LLM 제공업체
export type LLMProvider = "openai" | "anthropic" | "google" | "custom";

// LLM 모델 정보
export interface LLMModel {
  id: string;
  name: string;
  provider: LLMProvider;
  description: string;
  max_tokens: number;
  input_cost_per_1k_tokens?: number;
  output_cost_per_1k_tokens?: number;
  supports_streaming: boolean;
  supports_function_calling: boolean;
}

// LLM API 설정
export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  inputCostPer1kTokens?: number;
  outputCostPer1kTokens?: number;
}

// API 응답 타입
export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// 스트리밍 응답 타입
export interface ChatStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string;
  }[];
}

// UI 상태 타입
export interface ChatUIState {
  isLoading: boolean;
  isStreaming: boolean;
  currentMessage: string;
  selectedModel: LLMModel;
  currentSession: ChatSession | null;
  sidebarOpen: boolean;
  darkMode: boolean;
}

// 에러 타입
export interface APIError {
  message: string;
  code: string;
  type: "authentication" | "rate_limit" | "invalid_request" | "server_error";
  details?: Record<string, unknown>;
}
