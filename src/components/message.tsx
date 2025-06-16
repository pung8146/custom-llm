'use client';

import { Message as MessageType } from '@/types/chat';
import { UserIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="py-2 px-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm">
        <div className="font-medium">시스템 메시지</div>
        <div className="mt-1">{message.content}</div>
      </div>
    );
  }

  return (
    <div className={`py-6 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-500' : 'bg-green-500'
            }`}
          >
            {isUser ? (
              <UserIcon className="w-5 h-5 text-white" />
            ) : (
              <CpuChipIcon className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900">
                {isUser ? '사용자' : 'AI 어시스턴트'}
              </span>
              {message.model && (
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                  {message.model}
                </span>
              )}
              <span className="text-xs text-gray-400">
                {format(message.timestamp, 'HH:mm', { locale: ko })}
              </span>
            </div>

            <div className="prose prose-sm max-w-none text-gray-800">
              {isUser ? (
                <div className="whitespace-pre-wrap">{message.content}</div>
              ) : (
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;

                      return isInline ? (
                        <code
                          className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <SyntaxHighlighter
                          style={oneDark as any}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md !mt-2 !mb-2"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    },
                    pre({ children }) {
                      return <>{children}</>;
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                          {children}
                        </blockquote>
                      );
                    },
                    h1({ children }) {
                      return (
                        <h1 className="text-xl font-bold mt-4 mb-2">
                          {children}
                        </h1>
                      );
                    },
                    h2({ children }) {
                      return (
                        <h2 className="text-lg font-bold mt-3 mb-2">
                          {children}
                        </h2>
                      );
                    },
                    h3({ children }) {
                      return (
                        <h3 className="text-md font-bold mt-2 mb-1">
                          {children}
                        </h3>
                      );
                    },
                    ul({ children }) {
                      return (
                        <ul className="list-disc pl-6 space-y-1">{children}</ul>
                      );
                    },
                    ol({ children }) {
                      return (
                        <ol className="list-decimal pl-6 space-y-1">
                          {children}
                        </ol>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-2 leading-relaxed">{children}</p>;
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
