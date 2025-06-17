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
    <div
      className={`group w-full text-gray-800 border-b border-black/10 ${
        isUser ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
        <div className="flex-shrink-0 flex flex-col relative items-end">
          {/* Avatar */}
          <div
            className={`relative h-8 w-8 rounded-sm text-white flex items-center justify-center ${
              isUser ? 'bg-[#19c37d]' : 'bg-[#10a37f]'
            }`}
          >
            {isUser ? (
              <UserIcon className="w-5 h-5" />
            ) : (
              <CpuChipIcon className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
              {isUser ? (
                <div className="flex flex-col leading-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">사용자</span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp
                        ? new Date(message.timestamp).toLocaleTimeString(
                            'ko-KR',
                            { hour: '2-digit', minute: '2-digit' }
                          )
                        : '-'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ) : (
                <div className="flex flex-col leading-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">ChatGPT</span>
                    {message.model && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {message.model}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {message.timestamp
                        ? new Date(message.timestamp).toLocaleTimeString(
                            'ko-KR',
                            { hour: '2-digit', minute: '2-digit' }
                          )
                        : '-'}
                    </span>
                  </div>
                  <div className="markdown prose prose-sm max-w-none">
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
                        p({ children }) {
                          return <p className="mb-3 last:mb-0">{children}</p>;
                        },
                        h1({ children }) {
                          return (
                            <h1 className="text-xl font-bold mt-4 mb-3">
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
                            <ul className="list-disc pl-6 mb-3">{children}</ul>
                          );
                        },
                        ol({ children }) {
                          return (
                            <ol className="list-decimal pl-6 mb-3">
                              {children}
                            </ol>
                          );
                        },
                        li({ children }) {
                          return <li className="mb-1">{children}</li>;
                        },
                        blockquote({ children }) {
                          return (
                            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3">
                              {children}
                            </blockquote>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
