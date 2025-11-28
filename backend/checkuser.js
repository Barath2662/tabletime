// checkuser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // Add this line
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkUsers = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    console.log('Users in database:');
    console.log(JSON.stringify(users, null, 2));

    // Test password hashing
    const testPassword = 'admin123';
    console.log(`\nTesting password hashing for '${testPassword}':`);
    const hash = await bcrypt.hash(testPassword, 10);
    console.log(`New hash: ${hash}`);

    // Test password comparison for each user
    for (const user of users) {
      console.log(`\nTesting login for user: ${user.username} (${user.role})`);
      console.log(`Stored hash: ${user.password}`);
      
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log(`Password '${testPassword}' matches stored hash: ${isMatch}`);
      
      if (isMatch) {
        console.log('Login would be successful for this user!');
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();