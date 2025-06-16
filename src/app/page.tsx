'use client';

import Chat from '@/components/chat';
import Sidebar from '@/components/sidebar';

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Chat />
    </div>
  );
}
