#!/usr/bin/env node

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function verifySetup() {
  console.log('🚀 MongoDB Setup Verification\n');
  
  // Check environment variables
  console.log('1. Checking environment variables...');
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    return;
  }
  console.log('✅ MONGODB_URI found');
  
  // Test MongoDB connection
  console.log('\n2. Testing MongoDB connection...');
  const uri = process.env.MONGODB_URI;
  
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    await client.connect();
    
    // Test ping
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    const db = client.db('userauth');
    
    // List existing collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Existing collections:', collections.map(c => c.name).join(', ') || 'None');
    
    // Test collection creation
    console.log('\n3. Setting up collections...');
    
    try {
      const usersCollection = db.collection('users');
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Users collection ready');
    } catch (error) {
      if (error.code === 11000 || error.codeName === 'IndexOptionsConflict') {
        console.log('ℹ️  Users collection already exists');
      } else {
        throw error;
      }
    }
    
    try {
      const subscribersCollection = db.collection('newsletter_subscribers');
      await subscribersCollection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Newsletter subscribers collection ready');
    } catch (error) {
      if (error.code === 11000 || error.codeName === 'IndexOptionsConflict') {
        console.log('ℹ️  Newsletter subscribers collection already exists');
      } else {
        throw error;
      }
    }
    
    // Count documents
    const usersCount = await db.collection('users').countDocuments();
    const subscribersCount = await db.collection('newsletter_subscribers').countDocuments();
    
    console.log('\n4. Database status:');
    console.log(`👥 Users: ${usersCount}`);
    console.log(`📧 Newsletter subscribers: ${subscribersCount}`);
    
    await client.close();
    
    console.log('\n🎉 Setup verification completed successfully!');
    console.log('\nYour database is ready for:');
    console.log('• User registration and authentication');
    console.log('• Newsletter subscriptions');
    console.log('\nNext steps:');
    console.log('• Start your Next.js server: npm run dev');
    console.log('• Test the registration form');
    console.log('• Test the newsletter subscription');
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check MongoDB Atlas cluster status');
    console.log('2. Verify network access settings (IP whitelist)');
    console.log('3. Confirm database user permissions');
    console.log('4. Ensure cluster is not paused');
    
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('5. SSL/TLS issues - try reconnecting or check cluster status');
    }
  }
}

verifySetup().catch(console.error);
