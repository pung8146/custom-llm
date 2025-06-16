import { NextResponse } from 'next/server';
import { getEnabledModels } from '@/lib/models';

export async function GET() {
  try {
    const models = getEnabledModels();

    return NextResponse.json({
      success: true,
      data: models,
    });
  } catch (error: any) {
    console.error('Models API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
