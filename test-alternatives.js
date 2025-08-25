#!/usr/bin/env node

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testAlternativeConnections() {
  console.log('🔧 Testing Alternative MongoDB Connection Formats\n');
  
  const originalUri = process.env.MONGODB_URI;
  console.log('Original URI:', originalUri.replace(/:([^@]+)@/, ':***@'));
  
  // Alternative connection string formats
  const alternatives = [
    // Standard with different options
    'mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth?retryWrites=true&w=majority',
    
    // With SSL explicitly enabled
    'mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth?ssl=true&retryWrites=true&w=majority',
    
    // With authSource
    'mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth?authSource=admin&retryWrites=true&w=majority',
    
    // Alternative cluster format (common MongoDB Atlas format)
    'mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@cluster0.ljilgjv.mongodb.net/userauth?retryWrites=true&w=majority',
    
    // Standard MongoDB connection (not SRV)
    'mongodb://jadhavprathameshv:3v4mnZ60ia7TRKIb@login-shard-00-00.ljilgjv.mongodb.net:27017,login-shard-00-01.ljilgjv.mongodb.net:27017,login-shard-00-02.ljilgjv.mongodb.net:27017/userauth?ssl=true&replicaSet=atlas-5gfomw-shard-0&authSource=admin&retryWrites=true&w=majority',
  ];
  
  for (let i = 0; i < alternatives.length; i++) {
    const uri = alternatives[i];
    const maskedUri = uri.replace(/:([^@]+)@/, ':***@');
    
    console.log(`\n${i + 1}. Testing: ${maskedUri}`);
    
    try {
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      
      console.log('✅ SUCCESS! This connection string works!');
      console.log('\nUpdate your .env.local file with this connection string:');
      console.log(`MONGODB_URI=${uri}`);
      
      // Test database operations
      const db = client.db('userauth');
      const collections = await db.listCollections().toArray();
      console.log(`Found ${collections.length} collections in the database`);
      
      await client.close();
      return;
      
    } catch (error) {
      console.log('❌ Failed:', error.message.split('\n')[0]);
    }
  }
  
  console.log('\n❌ None of the alternative connection strings worked.');
  console.log('\n🔧 This suggests one of the following issues:');
  console.log('1. MongoDB Atlas cluster is paused, deleted, or inactive');
  console.log('2. Incorrect cluster name in the connection string');
  console.log('3. Database user credentials are incorrect');
  console.log('4. Network/firewall issues');
  
  console.log('\n📋 Action Items:');
  console.log('1. Log into MongoDB Atlas (https://cloud.mongodb.com/)');
  console.log('2. Check if your cluster exists and is active');
  console.log('3. Get the correct connection string from Atlas dashboard');
  console.log('4. Verify your database user credentials');
  console.log('5. Check network access settings');
}

testAlternativeConnections().catch(console.error);
