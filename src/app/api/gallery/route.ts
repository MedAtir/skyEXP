import { NextResponse } from 'next/server';
import GalleryItem from '@/models/GalleryItem';
import { dbConnect } from '@/lib/dbConnect';

// GET all gallery items
export async function GET() {
  try {
    await dbConnect();
    const galleryItems = await GalleryItem.find({});
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create new gallery item
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    if (!data.imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      );
    }
    
    const newItem = await GalleryItem.create(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}