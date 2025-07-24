import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

async function createAdmin() {
  try {
    await dbConnect();
    
    const admin = new User({
      name: 'Initial Admin',
      email: 'admin@example.com',
      password: 'adminPassword123', // Change after first login
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('Admin user created successfully:', {
      id: admin._id,
      email: admin.email
    });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit();
  }
}

createAdmin();