# Custom LLM Chat

ChatGPT와 유사한 UI를 가진 커스텀 LLM 채팅 애플리케이션입니다. 다양한 AI 모델(OpenAI, Anthropic)을 저렴하게 사용할 수 있습니다.

## 주요 기능

- 🤖 **다중 AI 모델 지원**: OpenAI GPT 시리즈, Anthropic Claude 시리즈
- 💰 **비용 효율적**: 직접 API를 사용하여 저렴한 비용으로 AI 채팅 이용
- 💬 **실시간 채팅**: ChatGPT와 유사한 사용자 경험
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 최적화
- 🎨 **모던 UI**: Tailwind CSS를 사용한 깔끔하고 직관적인 인터페이스
- 💾 **로컬 저장**: Zustand를 사용한 상태 관리 및 브라우저 로컬 저장

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **상태 관리**: Zustand
- **UI 컴포넌트**: Heroicons, React Markdown
- **백엔드**: Next.js API Routes
- **데이터베이스**: Supabase (향후 추가 예정)

## 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/custom-llm-chat.git
cd custom-llm-chat
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API Keys (사용하고자 하는 서비스의 API 키만 입력하세요)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Supabase (향후 사용 예정)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. API 키 발급 방법

#### OpenAI API 키

1. [OpenAI 플랫폼](https://platform.openai.com/)에 접속
2. 계정 생성 또는 로그인
3. API 키 생성 (Billing 정보 입력 필요)
4. 생성된 키를 `.env.local`에 입력

#### Anthropic API 키

1. [Anthropic Console](https://console.anthropic.com/)에 접속
2. 계정 생성 또는 로그인
3. API 키 생성 (크레딧 충전 필요)
4. 생성된 키를 `.env.local`에 입력

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용 방법

1. **모델 선택**: 사이드바에서 사용하고 싶은 AI 모델을 선택합니다.
2. **새 대화 시작**: "새로운 대화" 버튼을 클릭하거나 메시지를 입력합니다.
3. **채팅**: 메시지를 입력하고 Enter를 누르거나 전송 버튼을 클릭합니다.
4. **대화 관리**: 사이드바에서 이전 대화를 확인하고 관리할 수 있습니다.

## 지원하는 모델

### OpenAI

- GPT-4o Mini (가장 저렴)
- GPT-4o
- GPT-3.5 Turbo

### Anthropic

- Claude 3.5 Sonnet
- Claude 3 Haiku

## 비용 정보

모든 가격은 100만 토큰당 USD 기준입니다:

| 모델              | 입력 토큰 | 출력 토큰 |
| ----------------- | --------- | --------- |
| GPT-4o Mini       | $0.15     | $0.60     |
| GPT-3.5 Turbo     | $0.50     | $1.50     |
| GPT-4o            | $5.00     | $15.00    |
| Claude 3 Haiku    | $0.25     | $1.25     |
| Claude 3.5 Sonnet | $3.00     | $15.00    |

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 라우트
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── components/         # React 컴포넌트
│   ├── chat.tsx        # 메인 채팅 컴포넌트
│   ├── sidebar.tsx     # 사이드바
│   ├── message.tsx     # 메시지 컴포넌트
│   └── chat-input.tsx  # 입력 컴포넌트
├── lib/                # 유틸리티 라이브러리
├── store/              # Zustand 상태 관리
├── types/              # TypeScript 타입 정의
└── utils/              # 헬퍼 함수
```

## 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 기여하기

이슈나 풀 리퀘스트를 통해 프로젝트에 기여해주세요!

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.
