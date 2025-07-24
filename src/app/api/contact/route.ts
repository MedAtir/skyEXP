import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    
    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Send email
    await sendContactEmail(name, email, phone, subject, message);
    
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}