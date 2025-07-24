import { NextResponse } from 'next/server';
import Booking from '@/models/Booking';
import { dbConnect } from '@/lib/dbConnect';

// POST create new booking
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Basic validation
    if (!data.service || !data.date || !data.participants || !data.customer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newBooking = await Booking.create(data);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}