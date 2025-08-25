import { NextResponse } from 'next/server';

// In a real application, you would use a database and email service
let contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  organization?: string;
  organizationType?: string;
  message: string;
  submittedAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const { name, email, organization, organizationType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Simple spam protection (in production, use more sophisticated methods)
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message too short' },
        { status: 400 }
      );
    }

    // Create message record
    const contactMessage = {
      id: Date.now().toString(),
      name,
      email,
      organization: organization || '',
      organizationType: organizationType || '',
      message,
      submittedAt: new Date().toISOString(),
    };

    contactMessages.push(contactMessage);

    // In a real application, you would:
    // 1. Store in database
    // 2. Send notification email to your team
    // 3. Send confirmation email to the user
    // 4. Add to CRM system
    
    console.log('New contact message received:', contactMessage);

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: contactMessage.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to view messages (in production, this should be protected)
  return NextResponse.json({
    count: contactMessages.length,
    messages: contactMessages,
  });
}