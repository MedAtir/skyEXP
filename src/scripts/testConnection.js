const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    console.log('Testing connection...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('✅ Collections found:', collections.map(c => c.name));
    
    console.log('Closing connection...');
    await mongoose.disconnect();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

testConnection();