'use client';

export default function TestStyles() {
  return (
    <div className="p-4 bg-red-500 text-white">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS 테스트</h1>
      <div className="bg-blue-500 p-3 rounded-lg">
        <p className="text-yellow-300">
          이 텍스트가 노란색이면 Tailwind가 작동합니다!
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
          버튼 1
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded">
          버튼 2
        </button>
      </div>
    </div>
  );
}
