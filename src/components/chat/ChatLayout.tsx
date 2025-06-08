"use client";

import { useChatStore } from "@/store/chatStore";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "./ChatArea";
import { cn } from "@/utils/cn";

export function ChatLayout() {
  const sidebarOpen = useChatStore((state) => state.sidebarOpen);

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-0",
          "md:w-64" // 데스크톱에서는 항상 표시
        )}
      >
        <Sidebar />
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea />
      </div>

      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => useChatStore.getState().setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
