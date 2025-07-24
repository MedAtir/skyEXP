import { NextResponse } from 'next/server';
import Service from '@/models/Service';
import { dbConnect } from '@/lib/dbConnect';

// GET all services
export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({});
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create new service
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const newService = await Service.create(data);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}