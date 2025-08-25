#!/usr/bin/env node

const { MongoClient } = require('mongodb');
const https = require('https');
const dns = require('dns').promises;
require('dotenv').config({ path: '.env.local' });

async function comprehensiveTest() {
  console.log('🔍 MongoDB Atlas Comprehensive Diagnostic Tool\n');
  
  // Step 1: Check environment variables
  console.log('1. Environment Variables Check:');
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    return;
  }
  console.log('✅ MONGODB_URI found');
  
  // Parse connection string
  const uri = process.env.MONGODB_URI;
  const urlMatch = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/\?]+)/);
  if (!urlMatch) {
    console.error('❌ Invalid MongoDB URI format');
    return;
  }
  
  const [, username, password, cluster] = urlMatch;
  console.log('✅ Connection string parsed successfully');
  console.log(`   - Cluster: ${cluster}`);
  console.log(`   - Username: ${username}`);
  console.log(`   - Password: ${'*'.repeat(password.length)}`);
  
  // Step 2: DNS Resolution Test
  console.log('\n2. DNS Resolution Test:');
  try {
    const addresses = await dns.resolve4(cluster);
    console.log('✅ DNS resolution successful');
    console.log(`   - Resolved IPs: ${addresses.join(', ')}`);
  } catch (dnsError) {
    console.error('❌ DNS resolution failed:', dnsError.message);
    return;
  }
  
  // Step 3: Network Connectivity Test
  console.log('\n3. Network Connectivity Test:');
  try {
    await testHttpsConnection(cluster, 443);
    console.log('✅ HTTPS connectivity successful');
  } catch (netError) {
    console.error('❌ Network connectivity failed:', netError.message);
    console.log('🔧 This might indicate firewall or network issues');
  }
  
  // Step 4: MongoDB Connection Tests
  console.log('\n4. MongoDB Connection Tests:');
  
  const connectionStrategies = [
    {
      name: 'Standard Connection',
      options: {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      }
    },
    {
      name: 'Connection with SSL Options',
      options: {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        tls: true,
        tlsInsecure: false
      }
    },
    {
      name: 'Connection with Relaxed Timeouts',
      options: {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        maxPoolSize: 1,
        retryWrites: true
      }
    }
  ];
  
  let successfulConnection = false;
  
  for (let i = 0; i < connectionStrategies.length; i++) {
    const strategy = connectionStrategies[i];
    console.log(`\n   Testing: ${strategy.name}`);
    
    try {
      const client = new MongoClient(uri, strategy.options);
      
      console.log('   - Attempting connection...');
      await client.connect();
      
      console.log('   - Testing ping...');
      await client.db('admin').command({ ping: 1 });
      
      console.log('   - Testing database operations...');
      const db = client.db('userauth');
      
      // Test basic operations
      const collections = await db.listCollections().toArray();
      console.log(`   - Found ${collections.length} existing collections`);
      
      // Test collection operations
      const testCollection = db.collection('connection_test');
      await testCollection.insertOne({ test: true, timestamp: new Date() });
      const testDoc = await testCollection.findOne({ test: true });
      await testCollection.deleteOne({ test: true });
      
      console.log('✅ All database operations successful!');
      console.log(`   - Strategy: ${strategy.name}`);
      
      await client.close();
      successfulConnection = true;
      break;
      
    } catch (error) {
      console.log(`❌ ${strategy.name} failed:`, error.message.split('\n')[0]);
      
      if (error.message.includes('SSL') || error.message.includes('TLS')) {
        console.log('   🔧 SSL/TLS error detected');
      } else if (error.message.includes('authentication')) {
        console.log('   🔧 Authentication error detected');
      } else if (error.message.includes('timeout')) {
        console.log('   🔧 Connection timeout detected');
      }
    }
  }
  
  // Step 5: Recommendations
  console.log('\n5. Diagnosis and Recommendations:');
  
  if (successfulConnection) {
    console.log('🎉 SUCCESS: MongoDB connection is working!');
    console.log('\nNext steps:');
    console.log('• Start your Next.js application: npm run dev');
    console.log('• Test the API endpoints');
    console.log('• Your database is ready for production use');
  } else {
    console.log('❌ FAILURE: Unable to connect to MongoDB Atlas');
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check MongoDB Atlas Dashboard:');
    console.log('   - Go to https://cloud.mongodb.com/');
    console.log('   - Ensure your cluster is ACTIVE (not paused)');
    console.log('   - Check cluster health status');
    
    console.log('\n2. Network Access Settings:');
    console.log('   - Go to Security > Network Access in Atlas');
    console.log('   - Add your current IP address to the whitelist');
    console.log('   - Or temporarily add 0.0.0.0/0 for testing (not recommended for production)');
    
    console.log('\n3. Database Access Settings:');
    console.log('   - Go to Security > Database Access in Atlas');
    console.log('   - Verify user credentials and permissions');
    console.log('   - Ensure user has "Read and write to any database" permissions');
    
    console.log('\n4. Cluster Issues:');
    console.log('   - Try pausing and unpausing the cluster');
    console.log('   - Check if there are any Atlas service status issues');
    console.log('   - Consider creating a new cluster if issues persist');
  }
  
  console.log('\n6. Connection String Alternatives to Try:');
  console.log('If the current connection fails, try these variations:');
  
  const alternatives = [
    uri.replace('?retryWrites=true&w=majority', '?ssl=true&retryWrites=true&w=majority'),
    uri.replace('?retryWrites=true&w=majority', '?authSource=admin&retryWrites=true&w=majority'),
    uri + '&tlsAllowInvalidCertificates=false'
  ];
  
  alternatives.forEach((alt, i) => {
    const masked = alt.replace(/:([^@]+)@/, ':***@');
    console.log(`   ${i + 1}. ${masked}`);
  });
}

function testHttpsConnection(hostname, port) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      port,
      method: 'GET',
      timeout: 5000,
      rejectUnauthorized: false
    }, (res) => {
      resolve(res);
    });
    
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Connection timeout')));
    req.end();
  });
}

comprehensiveTest().catch(console.error);
