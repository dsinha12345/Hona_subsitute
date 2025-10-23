const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing demo users
    await User.deleteMany({ email: { $in: ['client@demo.com', 'admin@demo.com'] } });
    console.log('Cleared demo users');
    
    // Create client
    const client = new User({
      email: 'client@demo.com',
      password: 'client123',
      name: 'John Doe',
      role: 'client',
      caseNumber: 'CASE-2024-001',
      currentPhase: 8,
      language: 'en'
    });
    await client.save();
    console.log('✅ Created client: client@demo.com / client123');
    
    // Create admin
    const admin = new User({
      email: 'admin@demo.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      language: 'en'
    });
    await admin.save();
    console.log('✅ Created admin: admin@demo.com / admin123');
    
    console.log('\n✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedUsers();