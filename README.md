# Custom LLM Chat App

나만의 GPT 기반 챗봇 웹 애플리케이션

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **LLM APIs**: OpenAI GPT, Claude, Gemini (확장 가능)

## 주요 기능

- 🤖 다양한 LLM 모델 지원 (GPT, Claude, Gemini)
- 💬 실시간 채팅 인터페이스
- 📱 반응형 디자인 (모바일 지원)
- 🔐 사용자 인증 및 API 키 관리
- 💾 대화 내역 저장 및 관리
- 🎨 ChatGPT 스타일 UI/UX

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

## 폴더 구조

```
custom-llm/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── lib/                 # 유틸리티, 설정, API 클라이언트
│   ├── hooks/               # 커스텀 훅
│   ├── store/               # Zustand 스토어
│   ├── types/               # TypeScript 타입 정의
│   └── utils/               # 헬퍼 함수
├── supabase/               # Supabase 설정 및 마이그레이션
├── public/                 # 정적 파일
└── docs/                   # 프로젝트 문서
```
