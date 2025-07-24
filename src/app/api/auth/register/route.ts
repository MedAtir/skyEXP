import { NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';
import { generateToken, handleError, validateRequest } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Validate request
    const validationError = validateRequest(data, ['name', 'email', 'password']);
    if (validationError) return validationError;
    
    // Check for existing user
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 'staff'
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = generateToken(newUser._id.toString(), newUser.role);
    
    // Return response without password
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      user: userResponse,
      token
    }, { status: 201 });
    
  } catch (error) {
    return handleError(error, 'Registration failed');
  }
}