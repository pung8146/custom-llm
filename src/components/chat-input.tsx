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
    <div className="absolute bottom-0 left-0 w-full border-t border-white/20 bg-white pt-2">
      <div className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="relative flex h-full flex-1 items-stretch"
        >
          <div className="flex flex-col w-full py-[10px] flex-grow relative border border-black/10 bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)]">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-12 pl-4 focus:ring-0 focus-visible:ring-0 outline-none"
              style={{
                minHeight: '24px',
                maxHeight: '200px',
              }}
            />

            {/* Send/Stop Button */}
            <div className="absolute right-2 bottom-1.5">
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStop}
                  className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="생성 중단"
                >
                  <StopIcon className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSend}
                  className={`p-1 rounded-md transition-colors ${
                    canSend
                      ? 'text-white bg-black hover:bg-gray-800'
                      : 'text-gray-300 bg-gray-100 cursor-not-allowed'
                  }`}
                  title="메시지 전송"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
