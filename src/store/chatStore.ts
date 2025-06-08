import { create } from "zustand";
import { ChatSession, ChatMessage, LLMModel, User } from "@/types";

interface ChatState {
  // 사용자 정보
  user: User | null;

  // 현재 채팅 세션
  currentSession: ChatSession | null;

  // 채팅 메시지들
  messages: ChatMessage[];

  // UI 상태
  isLoading: boolean;
  isStreaming: boolean;
  sidebarOpen: boolean;
  darkMode: boolean;

  // 선택된 모델
  selectedModel: LLMModel | null;

  // 입력 상태
  inputMessage: string;

  // 채팅 세션 목록
  sessions: ChatSession[];
}

interface ChatActions {
  // 사용자 설정
  setUser: (user: User | null) => void;

  // 세션 관리
  setCurrentSession: (session: ChatSession | null) => void;
  createNewSession: (
    title: string,
    modelProvider: string,
    modelName: string
  ) => void;
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => void;
  deleteSession: (sessionId: string) => void;
  setSessions: (sessions: ChatSession[]) => void;

  // 메시지 관리
  addMessage: (message: ChatMessage) => void;
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;

  // UI 상태 관리
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;

  // 모델 관리
  setSelectedModel: (model: LLMModel | null) => void;

  // 입력 관리
  setInputMessage: (message: string) => void;
  clearInput: () => void;
}

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  // 초기 상태
  user: null,
  currentSession: null,
  messages: [],
  isLoading: false,
  isStreaming: false,
  sidebarOpen: true,
  darkMode: false,
  selectedModel: null,
  inputMessage: "",
  sessions: [],

  // Actions
  setUser: (user) => set({ user }),

  // 세션 관리
  setCurrentSession: (session) => set({ currentSession: session }),

  createNewSession: (title, modelProvider, modelName) => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      user_id: get().user?.id || "",
      title,
      model_provider: modelProvider as any,
      model_name: modelName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      message_count: 0,
    };

    set((state) => ({
      sessions: [newSession, ...state.sessions],
      currentSession: newSession,
      messages: [],
    }));
  },

  updateSession: (sessionId, updates) => {
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? { ...session, ...updates, updated_at: new Date().toISOString() }
          : session
      ),
      currentSession:
        state.currentSession?.id === sessionId
          ? {
              ...state.currentSession,
              ...updates,
              updated_at: new Date().toISOString(),
            }
          : state.currentSession,
    }));
  },

  deleteSession: (sessionId) => {
    set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== sessionId),
      currentSession:
        state.currentSession?.id === sessionId ? null : state.currentSession,
      messages: state.currentSession?.id === sessionId ? [] : state.messages,
    }));
  },

  setSessions: (sessions) => set({ sessions }),

  // 메시지 관리
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));

    // 세션의 메시지 카운트 업데이트
    const currentSession = get().currentSession;
    if (currentSession) {
      get().updateSession(currentSession.id, {
        message_count: get().messages.length + 1,
      });
    }
  },

  updateMessage: (messageId, updates) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, ...updates } : message
      ),
    }));
  },

  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),

  // UI 상태 관리
  setLoading: (isLoading) => set({ isLoading }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // 모델 관리
  setSelectedModel: (selectedModel) => set({ selectedModel }),

  // 입력 관리
  setInputMessage: (inputMessage) => set({ inputMessage }),
  clearInput: () => set({ inputMessage: "" }),
}));
