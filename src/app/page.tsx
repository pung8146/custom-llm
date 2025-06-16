'use client';

import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';
import TestStyles from '@/components/test-styles';

export default function HomePage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TestStyles />
        <Chat />
      </div>
    </div>
  );
}
