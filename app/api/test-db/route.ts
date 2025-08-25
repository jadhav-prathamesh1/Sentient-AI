import { NextResponse } from 'next/server';
import clientPromise, { initializeDatabase, checkConnection } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // First check if connection is healthy
    const isHealthy = await checkConnection();
    
    if (!isHealthy) {
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: 'Unable to establish connection to MongoDB Atlas',
          suggestions: [
            'Check if your MongoDB Atlas cluster is running (not paused)',
            'Verify network access settings in Atlas dashboard',
            'Confirm your IP address is whitelisted',
            'Check database user permissions'
          ],
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }

    // Try to initialize database
    const dbInitResult = await initializeDatabase();
    
    if (!dbInitResult) {
      return NextResponse.json(
        { 
          error: 'Database initialization failed',
          message: 'Connection established but unable to initialize collections',
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }
    
    // Test collections
    const client = await clientPromise;
    const db = client.db('userauth');
    
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
      status: 'healthy',
      timestamp: new Date().toISOString()
    };
    
    console.log('Database test successful:', response);
    
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Database test failed:', error);
    
    let errorMessage = 'Database connection failed';
    let suggestions = [
      'Check MongoDB Atlas cluster status',
      'Verify network access settings',
      'Confirm database user permissions'
    ];
    
    if (error.message?.includes('SSL') || error.message?.includes('TLS')) {
      errorMessage = 'SSL/TLS connection error';
      suggestions = [
        'MongoDB Atlas cluster might be paused or inactive',
        'Check cluster status at https://cloud.mongodb.com/',
        'Verify network connectivity',
        'Try restarting the cluster if it appears inactive'
      ];
    } else if (error.message?.includes('authentication')) {
      errorMessage = 'Database authentication error';
      suggestions = [
        'Check database user credentials',
        'Verify user permissions in Atlas dashboard',
        'Ensure user has read/write access to the database'
      ];
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        suggestions,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
