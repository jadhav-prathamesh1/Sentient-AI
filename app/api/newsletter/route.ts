import { NextResponse } from 'next/server';
import clientPromise, { initializeDatabase, safeDbOperation } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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
        const subscribers = db.collection('newsletter_subscribers');
        
        // Check if email already exists
        const existingSubscriber = await subscribers.findOne({ email });
        if (existingSubscriber) {
          return { alreadyExists: true };
        }

        // Add new subscriber
        const insertResult = await subscribers.insertOne({
          email,
          subscribedAt: new Date(),
          active: true,
          source: 'website',
        });

        return { insertResult };
      },
      null,
      'Newsletter subscription'
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 }
      );
    }

    if (result.alreadyExists) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
      );
    }

    console.log('Newsletter subscription successful:', { 
      subscriberId: result.insertResult.insertedId, 
      email 
    });
    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
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

export async function GET() {
  try {
    // Initialize database collections if they don't exist
    const dbInitResult = await initializeDatabase();
    
    if (!dbInitResult && process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { error: 'Database not available. Please check MongoDB Atlas connection.' },
        { status: 503 }
      );
    }
    
    const result = await safeDbOperation(
      async (db) => {
        const subscribers = db.collection('newsletter_subscribers');
        
        const count = await subscribers.countDocuments({ active: true });
        const subscriberList = await subscribers.find(
          { active: true }, 
          { projection: { email: 1, subscribedAt: 1, source: 1 } }
        ).sort({ subscribedAt: -1 }).toArray();
        
        return { count, subscribers: subscriberList };
      },
      { count: 0, subscribers: [] },
      'Newsletter GET operation'
    );
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Newsletter GET error:', error);
    
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