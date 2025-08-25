import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Multiple connection options to try
const connectionOptions = [
  // Standard connection with SSL
  {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true
  },
  // Connection with explicit SSL options
  {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true,
    tls: true,
    tlsInsecure: false
  },
  // Connection with relaxed SSL for testing
  {
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 20000,
    maxPoolSize: 5,
    minPoolSize: 1,
    retryWrites: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    directConnection: false
  }
];

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function createConnectionWithFallback(): Promise<MongoClient> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < connectionOptions.length; i++) {
    const options = connectionOptions[i];
    console.log(`Attempting MongoDB connection with strategy ${i + 1}/${connectionOptions.length}...`);
    
    try {
      const testClient = new MongoClient(uri, options);
      await testClient.connect();
      
      // Test the connection with a ping
      await testClient.db('admin').command({ ping: 1 });
      console.log(`✅ Successfully connected to MongoDB with strategy ${i + 1}`);
      
      return testClient;
    } catch (error: any) {
      console.log(`❌ Connection strategy ${i + 1} failed:`, error.message);
      lastError = error;
      
      // Wait a bit before trying the next strategy
      if (i < connectionOptions.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  // If all strategies failed, throw the last error with additional context
  const enhancedError = new Error(
    `Failed to connect to MongoDB after trying ${connectionOptions.length} strategies. ` +
    `Last error: ${lastError?.message}. ` +
    `Please check: 1) MongoDB Atlas cluster status, 2) Network access settings, 3) Database user permissions.`
  );
  enhancedError.cause = lastError;
  throw enhancedError;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createConnectionWithFallback();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = createConnectionWithFallback();
}

// Function to check if connection is healthy
export async function checkConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    await client.db('admin').command({ ping: 1 });
    return true;
  } catch (error) {
    console.error('Connection health check failed:', error);
    return false;
  }
}

// Function to initialize database collections with better error handling
export async function initializeDatabase() {
  try {
    console.log('Initializing database connection...');
    const client = await clientPromise;
    
    // Test the connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db('userauth');
    
    // Create users collection with indexes
    const usersCollection = db.collection('users');
    try {
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Users collection index created');
    } catch (indexError: any) {
      if (indexError.code === 11000 || indexError.codeName === 'IndexOptionsConflict' || indexError.message?.includes('already exists')) {
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
      if (indexError.code === 11000 || indexError.codeName === 'IndexOptionsConflict' || indexError.message?.includes('already exists')) {
        console.log('ℹ️  Newsletter subscribers collection index already exists');
      } else {
        throw indexError;
      }
    }
    
    console.log('✅ Database collections initialized successfully');
    return { usersCollection, subscribersCollection };
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error.message);
    
    // Provide helpful error messages based on error type
    if (error.message?.includes('SSL') || error.message?.includes('TLS')) {
      console.error('🔧 SSL/TLS Error - This usually means:');
      console.error('   1. MongoDB Atlas cluster is paused or inactive');
      console.error('   2. Network connectivity issues');
      console.error('   3. Check cluster status at https://cloud.mongodb.com/');
    } else if (error.message?.includes('authentication')) {
      console.error('🔧 Authentication Error - Check database user credentials');
    } else if (error.message?.includes('ServerSelectionTimeoutError') || error.message?.includes('ReplicaSetNoPrimary')) {
      console.error('🔧 Connection Timeout - This usually means:');
      console.error('   1. MongoDB Atlas cluster is paused');
      console.error('   2. Network access settings need IP whitelist update');
      console.error('   3. Cluster might be experiencing issues');
    }
    
    // Don't throw in development to prevent app crashes
    if (process.env.NODE_ENV === 'development') {
      console.error('⚠️  Continuing without database connection in development mode');
      return null;
    }
    
    throw error;
  }
}

// Function to safely execute database operations with error handling
export async function safeDbOperation<T>(
  operation: (db: any) => Promise<T>,
  defaultValue: T,
  operationName: string = 'Database operation'
): Promise<T> {
  try {
    const client = await clientPromise;
    const db = client.db('userauth');
    return await operation(db);
  } catch (error: any) {
    console.error(`❌ ${operationName} failed:`, error.message);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️  Returning default value for ${operationName} in development mode`);
      return defaultValue;
    }
    
    throw error;
  }
}

export default clientPromise;
