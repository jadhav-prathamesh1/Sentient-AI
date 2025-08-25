import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { initializeDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    const client = await clientPromise;
    const db = client.db('userauth');
    
    // Initialize collections
    await initializeDatabase();
    
    // Test collections
    const usersCount = await db.collection('users').countDocuments();
    const subscribersCount = await db.collection('newsletter_subscribers').countDocuments();
    
    const response = {
      message: 'Database connection successful!',
      database: 'userauth',
      collections: {
        users: {
          count: usersCount,
          exists: true
        },
        newsletter_subscribers: {
          count: subscribersCount,
          exists: true
        }
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('Database test successful:', response);
    
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
