import { LLMModel } from '@/types/chat';

export const AVAILABLE_MODELS: LLMModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: 'Fastest, most cost-effective model for low-latency tasks',
    pricing: {
      input: 0.1, // $0.100 / 1M tokens:contentReference[oaicite:0]{index=0}
      output: 0.4, // $0.400 / 1M tokens:contentReference[oaicite:1]{index=1}
    },
    contextLength: 128000,
    enabled: true,
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: 'Affordable model balancing speed and intelligence',
    pricing: {
      input: 0.4, // $0.40 / 1M tokens:contentReference[oaicite:2]{index=2}
      output: 1.6, // $1.60 / 1M tokens:contentReference[oaicite:3]{index=3}
    },
    contextLength: 128000,
    enabled: true,
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    description: 'Smartest model for complex tasks',
    pricing: {
      input: 2.0, // $2.00 / 1M tokens:contentReference[oaicite:4]{index=4}
      output: 8.0, // $8.00 / 1M tokens:contentReference[oaicite:5]{index=5}
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
