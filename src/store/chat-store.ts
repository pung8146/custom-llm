import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat, Message, LLMModel, ChatState } from '@/types/chat';
import { AVAILABLE_MODELS } from '@/lib/models';

interface ChatActions {
  // Chat management
  createChat: (model: LLMModel) => string;
  deleteChat: (chatId: string) => void;
  setCurrentChat: (chatId: string | null) => void;
  updateChatTitle: (chatId: string, title: string) => void;

  // Message management
  addMessage: (
    chatId: string,
    message: Omit<Message, 'id' | 'timestamp'>
  ) => void;
  updateMessage: (chatId: string, messageId: string, content: string) => void;

  // Model management
  setSelectedModel: (model: LLMModel | null) => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Utility
  getCurrentChat: () => Chat | null;
  getChatById: (chatId: string) => Chat | null;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      chats: [],
      currentChatId: null,
      selectedModel: AVAILABLE_MODELS[0], // Default to first model
      isLoading: false,
      error: null,

      // Chat management
      createChat: (model: LLMModel) => {
        const chatId = `chat_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const newChat: Chat = {
          id: chatId,
          title: '새로운 대화',
          messages: [],
          model,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: chatId,
          selectedModel: model,
        }));

        return chatId;
      },

      deleteChat: (chatId: string) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChatId:
            state.currentChatId === chatId ? null : state.currentChatId,
        }));
      },

      setCurrentChat: (chatId: string | null) => {
        set({ currentChatId: chatId });

        if (chatId) {
          const chat = get().getChatById(chatId);
          if (chat) {
            set({ selectedModel: chat.model });
          }
        }
      },

      updateChatTitle: (chatId: string, title: string) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, title, updatedAt: new Date() }
              : chat
          ),
        }));
      },

      // Message management
      addMessage: (
        chatId: string,
        message: Omit<Message, 'id' | 'timestamp'>
      ) => {
        const newMessage: Message = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };

        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  updatedAt: new Date(),
                  // Auto-update title for first user message
                  title:
                    chat.messages.length === 0 && message.role === 'user'
                      ? message.content.slice(0, 50) +
                        (message.content.length > 50 ? '...' : '')
                      : chat.title,
                }
              : chat
          ),
        }));
      },

      updateMessage: (chatId: string, messageId: string, content: string) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updatedAt: new Date(),
                }
              : chat
          ),
        }));
      },

      // Model management
      setSelectedModel: (model: LLMModel | null) => {
        set({ selectedModel: model });
      },

      // State management
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Utility functions
      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find((chat) => chat.id === currentChatId) || null;
      },

      getChatById: (chatId: string) => {
        const { chats } = get();
        return chats.find((chat) => chat.id === chatId) || null;
      },
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
        selectedModel: state.selectedModel,
      }),
    }
  )
);
