import { NextRequest, NextResponse } from 'next/server';
import { sendMessageNotification } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const { sellerEmail, buyerEmail, message, listingTitle } = await request.json();

    if (!sellerEmail || !buyerEmail || !message || !listingTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendMessageNotification(sellerEmail, buyerEmail, message, listingTitle);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-message API:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 