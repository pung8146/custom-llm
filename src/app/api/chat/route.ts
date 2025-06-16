import { NextRequest, NextResponse } from 'next/server';
import { Message, LLMModel } from '@/types/chat';

interface ChatRequest {
  messages: Message[];
  model: LLMModel;
}

async function callOpenAI(
  messages: Message[],
  model: LLMModel
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.id,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `OpenAI API error: ${error.error?.message || 'Unknown error'}`
    );
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

async function callAnthropic(
  messages: Message[],
  model: LLMModel
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  // Anthropic API has a different format
  const systemMessage = messages.find((m) => m.role === 'system');
  const conversationMessages = messages.filter((m) => m.role !== 'system');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model.id,
      max_tokens: 4000,
      system: systemMessage?.content || '',
      messages: conversationMessages.map((msg) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Anthropic API error: ${error.error?.message || 'Unknown error'}`
    );
  }

  const data = await response.json();
  return data.content[0]?.text || '';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model }: ChatRequest = await request.json();

    if (!messages || !model) {
      return NextResponse.json(
        { success: false, error: 'Messages and model are required' },
        { status: 400 }
      );
    }

    let responseContent: string;

    switch (model.provider) {
      case 'openai':
        responseContent = await callOpenAI(messages, model);
        break;
      case 'anthropic':
        responseContent = await callAnthropic(messages, model);
        break;
      default:
        return NextResponse.json(
          { success: false, error: `Provider ${model.provider} not supported` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        content: responseContent,
        model: model.id,
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
