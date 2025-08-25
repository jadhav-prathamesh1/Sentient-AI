import { NextResponse } from 'next/server';
import clientPromise, { initializeDatabase, safeDbOperation } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role, organization } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Name, email, password, and role are required' },
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

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['parent', 'teacher', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
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
    const result = await safeDbOperation(
      async (db) => {
        const users = db.collection('users');
        
        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const insertResult = await users.insertOne({
          name,
          email,
          password: hashedPassword,
          role,
          organization: organization || '',
          createdAt: new Date(),
          active: true,
        });

        return insertResult;
      },
      null,
      'User registration'
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }

    console.log('User created successfully:', { 
      userId: result.insertedId, 
      email, 
      role 
    });
    return NextResponse.json(
      { 
        message: 'User created successfully',
        userId: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('User with this email already exists')) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
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