const { MongoClient } = require('mongodb');

async function testConnection() {
  // Modified connection string with database name specified
  const uri = 'mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth?retryWrites=true&w=majority&appName=login';
  
  console.log('Testing MongoDB connection...');
  console.log('Connection string (without password):', uri.replace(/\/\/.*:.*@/, '//***:***@'));
  
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    console.log('Attempting to connect...');
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database operations
    const db = client.db('userauth');
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Existing collections:', collections.map(c => c.name));
    
    // Create test collections if they don't exist
    try {
      const usersCollection = db.collection('users');
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('👥 Users collection ready');
      
      const subscribersCollection = db.collection('newsletter_subscribers');
      await subscribersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('📧 Newsletter subscribers collection ready');
      
      // Count documents
      const usersCount = await usersCollection.countDocuments();
      const subscribersCount = await subscribersCollection.countDocuments();
      
      console.log(`📊 Current data counts:`);
      console.log(`   Users: ${usersCount}`);
      console.log(`   Newsletter subscribers: ${subscribersCount}`);
      
    } catch (indexError) {
      console.log('ℹ️  Indexes already exist:', indexError.message);
    }
    
    await client.close();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();
