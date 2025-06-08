import { LLMConfig, ChatCompletionResponse, ChatStreamChunk } from "@/types";

export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LLMStreamOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

// LLM 제공업체 기본 추상 클래스
export abstract class BaseLLMProvider {
  protected config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  // 채팅 완료 (일반 응답)
  abstract chat(messages: LLMMessage[]): Promise<ChatCompletionResponse>;

  // 스트리밍 채팅
  abstract streamChat(
    messages: LLMMessage[],
    options?: LLMStreamOptions
  ): Promise<void>;

  // API 키 유효성 검사
  abstract validateApiKey(): Promise<boolean>;

  // 모델 목록 가져오기
  abstract getAvailableModels(): Promise<string[]>;

  // 토큰 수 계산 (근사치)
  estimateTokens(text: string): number {
    // 간단한 토큰 추정 (실제로는 tiktoken 등을 사용해야 함)
    return Math.ceil(text.length / 4);
  }

  // 비용 계산
  calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost =
      (inputTokens / 1000) * (this.config.inputCostPer1kTokens || 0);
    const outputCost =
      (outputTokens / 1000) * (this.config.outputCostPer1kTokens || 0);
    return inputCost + outputCost;
  }

  // 설정 업데이트
  updateConfig(newConfig: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // 공통 헤더 생성
  protected getHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.apiKey}`,
    };
  }

  // 공통 에러 처리
  protected handleError(error: any): Error {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.message;

      switch (status) {
        case 401:
          return new Error(`인증 실패: ${message}`);
        case 429:
          return new Error(`요청 한도 초과: ${message}`);
        case 500:
          return new Error(`서버 오류: ${message}`);
        default:
          return new Error(`API 오류 (${status}): ${message}`);
      }
    }

    return new Error(`네트워크 오류: ${error.message}`);
  }
}
