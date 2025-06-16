'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/chat-store';
import Message from './message';
import ChatInput from './chat-input';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Chat() {
  const {
    currentChatId,
    selectedModel,
    isLoading,
    error,
    getCurrentChat,
    addMessage,
    setLoading,
    setError,
    clearError,
    createChat,
  } = useChatStore();

  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const currentChat = getCurrentChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, streamingMessage]);

  const handleSend = async (content: string) => {
    if (!selectedModel) {
      setError('모델을 선택해주세요.');
      return;
    }

    let chatId = currentChatId;

    // 현재 채팅이 없으면 새로 생성
    if (!chatId) {
      chatId = createChat(selectedModel);
    }

    if (!chatId) {
      setError('채팅을 생성할 수 없습니다.');
      return;
    }

    // 사용자 메시지 추가
    addMessage(chatId, {
      role: 'user',
      content,
    });

    setLoading(true);
    setStreamingMessage('');
    clearError();

    try {
      // AbortController for cancelling requests
      abortControllerRef.current = new AbortController();

      const chat = getCurrentChat();
      if (!chat) {
        throw new Error('채팅을 찾을 수 없습니다.');
      }

      // 현재 채팅의 메시지에 새 사용자 메시지 포함
      const messagesForAPI = [
        ...chat.messages,
        { id: 'temp', role: 'user' as const, content, timestamp: new Date() },
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesForAPI,
          model: selectedModel,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '응답을 생성할 수 없습니다.');
      }

      const data = await response.json();

      if (data.success) {
        // AI 응답 메시지 추가
        addMessage(chatId, {
          role: 'assistant',
          content: data.data.content,
          model: data.data.model,
        });
      } else {
        throw new Error(data.error || '응답을 생성할 수 없습니다.');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request cancelled');
      } else {
        console.error('Chat error:', error);
        setError(error.message || '오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
      setStreamingMessage('');
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  if (!selectedModel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Custom LLM Chat
          </h2>
          <p className="text-gray-500 mb-4">
            사이드바에서 모델을 선택하여 시작하세요
          </p>
        </div>
      </div>
    );
  }

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedModel.name}과 대화하기
            </h2>
            <p className="text-gray-500 mb-4">
              아래에 메시지를 입력하여 대화를 시작하세요
            </p>
            <div className="text-sm text-gray-400">
              <div>입력 토큰: ${selectedModel.pricing.input}/M</div>
              <div>출력 토큰: ${selectedModel.pricing.output}/M</div>
              <div>
                컨텍스트 길이: {selectedModel.contextLength.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          placeholder={`${selectedModel.name}에게 메시지를 보내세요...`}
          onStop={handleStop}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white pb-32">
        {currentChat.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {/* Streaming message */}
        {streamingMessage && (
          <Message
            message={{
              id: 'streaming',
              role: 'assistant',
              content: streamingMessage,
              timestamp: new Date(),
              model: selectedModel.id,
            }}
          />
        )}

        {/* Loading indicator */}
        {isLoading && !streamingMessage && (
          <div className="group w-full text-gray-800 border-b border-black/10 bg-white">
            <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
              <div className="flex-shrink-0 flex flex-col relative items-end">
                <div className="relative h-8 w-8 rounded-sm bg-[#10a37f] text-white flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div className="flex flex-grow flex-col gap-3">
                  <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                    <div className="flex flex-col leading-7">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">
                          ChatGPT
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {selectedModel.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        placeholder={`${selectedModel.name}에게 메시지를 보내세요...`}
        onStop={handleStop}
      />
    </div>
  );
}
