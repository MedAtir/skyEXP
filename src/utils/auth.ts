import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

export const handleError = (error: any, message: string = 'Server Error') => {
  console.error(message, error);
  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
};

export const validateRequest = (data: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(', ')}` },
      { status: 400 }
    );
  }
  
  return null;
};