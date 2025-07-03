// test-mongo.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Connection error:', err);
  });
