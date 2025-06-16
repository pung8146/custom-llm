import { LLMModel } from '@/types/chat';

export const AVAILABLE_MODELS: LLMModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: '가장 저렴한 GPT-4 모델, 빠른 응답속도',
    pricing: {
      input: 0.15,
      output: 0.6,
    },
    contextLength: 128000,
    enabled: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: '최신 GPT-4 모델, 향상된 성능',
    pricing: {
      input: 5.0,
      output: 15.0,
    },
    contextLength: 128000,
    enabled: true,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: '저렴하고 빠른 성능의 모델',
    pricing: {
      input: 0.5,
      output: 1.5,
    },
    contextLength: 16385,
    enabled: true,
  },
  // Anthropic Models
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    description: '최고 성능의 Claude 모델',
    pricing: {
      input: 3.0,
      output: 15.0,
    },
    contextLength: 200000,
    enabled: true,
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    description: '빠르고 효율적인 Claude 모델',
    pricing: {
      input: 0.25,
      output: 1.25,
    },
    contextLength: 200000,
    enabled: true,
  },
];

export const getModelById = (id: string): LLMModel | undefined => {
  return AVAILABLE_MODELS.find((model) => model.id === id);
};

export const getModelsByProvider = (
  provider: 'openai' | 'anthropic' | 'google'
): LLMModel[] => {
  return AVAILABLE_MODELS.filter((model) => model.provider === provider);
};

export const getEnabledModels = (): LLMModel[] => {
  return AVAILABLE_MODELS.filter((model) => model.enabled);
};
