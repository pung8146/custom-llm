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
    <div className="flex flex-col h-full w-64 bg-[#171717] text-white">
      {/* Header */}
      <div className="p-3 border-b border-white/10">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 border border-white/20 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
          disabled={!selectedModel}
        >
          <PlusIcon className="w-4 h-4" />
          새로운 채팅
        </button>
      </div>

      {/* Model Selector */}
      <div className="p-3 border-b border-white/10">
        <div className="relative">
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {selectedModel?.name || '모델 선택'}
              </span>
              {selectedModel && (
                <span className="text-xs text-white/60">
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
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#2f2f2f] border border-white/20 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model)}
                  className="w-full text-left px-3 py-3 hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{model.name}</span>
                    <span className="text-xs text-white/60">
                      {model.provider} • ${model.pricing.input}/M tokens
                    </span>
                    <span className="text-xs text-white/40 mt-1">
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
          <div className="p-4 text-center text-white/40">
            <ChatBubbleLeftIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">채팅이 없습니다</p>
          </div>
        ) : (
          <div className="p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setCurrentChat(chat.id)}
                className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all mb-1 ${
                  currentChatId === chat.id
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-white/80'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ChatBubbleLeftIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{chat.model.name}</span>
                    <span>•</span>
                    <span>
                      {format(chat.updatedAt, 'MM/dd', { locale: ko })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-md transition-all"
                >
                  <TrashIcon className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="p-3 border-t border-white/10">
        <button className="w-full flex items-center gap-2 px-3 py-2.5 text-white/60 hover:bg-white/5 rounded-lg transition-colors">
          <Cog6ToothIcon className="w-4 h-4" />
          설정
        </button>
      </div>
    </div>
  );
}
