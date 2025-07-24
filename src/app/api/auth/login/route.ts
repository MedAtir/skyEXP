import { NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';
import { generateToken, handleError, validateRequest } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    
    // Validate request
    const validationError = validateRequest({ email, password }, ['email', 'password']);
    if (validationError) return validationError;
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken(user._id.toString(), user.role);
    
    // Return response without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      user: userResponse,
      token
    });
    
  } catch (error) {
    return handleError(error, 'Login failed');
  }
}