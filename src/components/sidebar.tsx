'use client';

import { useState } from 'react';
import { useChatStore } from '@/store/chat-store';
import { AVAILABLE_MODELS } from '@/lib/models';
import {
  PlusIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Sidebar() {
  const {
    chats,
    currentChatId,
    selectedModel,
    createChat,
    deleteChat,
    setCurrentChat,
    setSelectedModel,
  } = useChatStore();

  const [showModelSelector, setShowModelSelector] = useState(false);

  const handleNewChat = () => {
    if (selectedModel) {
      createChat(selectedModel);
    }
  };

  const handleModelChange = (model: (typeof AVAILABLE_MODELS)[0]) => {
    setSelectedModel(model);
    setShowModelSelector(false);
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          disabled={!selectedModel}
        >
          <PlusIcon className="w-4 h-4" />
          새로운 대화
        </button>
      </div>

      {/* Model Selector */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {selectedModel?.name || '모델 선택'}
              </span>
              {selectedModel && (
                <span className="text-xs text-gray-400">
                  {selectedModel.provider} • ${selectedModel.pricing.input}/M
                  tokens
                </span>
              )}
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                showModelSelector ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showModelSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{model.name}</span>
                    <span className="text-xs text-gray-400">
                      {model.provider} • ${model.pricing.input}/M tokens
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {model.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <ChatBubbleLeftIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">대화가 없습니다</p>
          </div>
        ) : (
          <div className="p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setCurrentChat(chat.id)}
                className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors mb-1 ${
                  currentChatId === chat.id
                    ? 'bg-gray-800 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ChatBubbleLeftIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {chat.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{chat.model.name}</span>
                    <span>•</span>
                    <span>
                      {format(chat.updatedAt, 'MM/dd', { locale: ko })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded transition-all"
                >
                  <TrashIcon className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
          <Cog6ToothIcon className="w-4 h-4" />
          설정
        </button>
      </div>
    </div>
  );
}
