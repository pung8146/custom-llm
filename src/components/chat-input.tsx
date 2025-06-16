'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
  onStop?: () => void;
}

export default function ChatInput({
  onSend,
  isLoading,
  disabled = false,
  placeholder = '메시지를 입력하세요...',
  onStop,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
      resetTextareaHeight();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleStop = () => {
    if (onStop) {
      onStop();
    }
  };

  const canSend = message.trim() && !disabled && !isLoading;

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="flex-1 resize-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: '52px',
                maxHeight: '200px',
              }}
            />

            {/* Send/Stop Button */}
            <div className="absolute right-2 bottom-2">
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="생성 중단"
                >
                  <StopIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSend}
                  className={`p-2 rounded-md transition-colors ${
                    canSend
                      ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title="메시지 전송"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Info Text */}
        <div className="mt-2 text-center text-xs text-gray-500">
          Enter로 전송, Shift+Enter로 줄바꿈
        </div>
      </div>
    </div>
  );
}
