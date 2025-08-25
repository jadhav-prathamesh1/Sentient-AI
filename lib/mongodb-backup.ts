import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000, // 10 seconds
  connectTimeoutMS: 10000, // 10 seconds
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Function to initialize database collections
export async function initializeDatabase() {
  try {
    console.log('Initializing database connection...');
    const client = await clientPromise;
    
    // Test the connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db('userauth'); // Using a clear database name for your auth system
    
    // Create users collection with indexes
    const usersCollection = db.collection('users');
    try {
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Users collection index created');
    } catch (indexError: any) {
      if (indexError.code === 11000 || indexError.codeName === 'IndexOptionsConflict') {
        console.log('ℹ️  Users collection index already exists');
      } else {
        throw indexError;
      }
    }
    
    // Create newsletter_subscribers collection with indexes
    const subscribersCollection = db.collection('newsletter_subscribers');
    try {
      await subscribersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Newsletter subscribers collection index created');
    } catch (indexError: any) {
      if (indexError.code === 11000 || indexError.codeName === 'IndexOptionsConflict') {
        console.log('ℹ️  Newsletter subscribers collection index already exists');
      } else {
        throw indexError;
      }
    }
    
    console.log('✅ Database collections initialized successfully');
    return { usersCollection, subscribersCollection };
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('🔧 SSL/TLS Error - Check MongoDB Atlas cluster status and network access');
    } else if (error.message.includes('authentication')) {
      console.error('🔧 Authentication Error - Check database user credentials');
    } else if (error.message.includes('ServerSelectionTimeoutError')) {
      console.error('🔧 Connection Timeout - Check network access and cluster status');
    }
    
    throw error;
  }
}

export default clientPromise;