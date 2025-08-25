import { NextResponse } from 'next/server';
import clientPromise, { initializeDatabase, safeDbOperation } from '@/lib/mongodb';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Initialize database collections if they don't exist
    const dbInitResult = await initializeDatabase();
    
    if (!dbInitResult && process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { error: 'Database not available. Please check MongoDB Atlas connection.' },
        { status: 503 }
      );
    }

    // Use safe database operation
    const user = await safeDbOperation(
      async (db) => {
        const users = db.collection('users');
        return await users.findOne({ email });
      },
      null,
      'User login lookup'
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user._id.toString());

    console.log('User logged in successfully:', { 
      userId: user._id, 
      email: user.email, 
      role: user.role 
    });
    // Create response with token in cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          organization: user.organization,
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle database connection errors
    if (error.message?.includes('Database not available') || 
        error.message?.includes('SSL') || 
        error.message?.includes('ServerSelectionTimeoutError')) {
      return NextResponse.json(
        { 
          error: 'Database connection error. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}