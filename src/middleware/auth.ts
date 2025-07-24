import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Skip authentication for these paths
  if (path.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Check for token in Authorization header
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json(
      { error: 'Authorization token required' },
      { status: 401 }
    );
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // Add user to request headers
    const headers = new Headers(req.headers);
    headers.set('x-user-id', decoded.id);
    headers.set('x-user-role', decoded.role);
    
    return NextResponse.next({
      request: {
        headers
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*'] // Protect all API routes
};