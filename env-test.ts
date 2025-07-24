// env-test.ts - CommonJS Version
require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');

console.log('✅ .env file loaded');

async function testEnv() {
  // Cloudinary Test
  console.log('\n=== Testing Cloudinary ===');
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    console.log('Cloudinary config verified');
    console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`API Key: ${process.env.CLOUDINARY_API_KEY ? '****' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'MISSING'}`);
  } catch (err) {
    console.error('❌ Cloudinary config error:', (err as Error).message);
  }

  // Email Test
  console.log('\n=== Testing Email Setup ===');
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log('✅ SMTP connection verified');
    console.log(`Host: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
    console.log(`User: ${process.env.EMAIL_USER}`);
    
    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: `Test <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Environment Test',
      text: 'Your environment variables are working correctly!',
    });
    
    console.log(`✅ Test email sent to ${process.env.ADMIN_EMAIL}`);
    console.log(`Message ID: ${info.messageId}`);
  } catch (err) {
    console.error('❌ Email test failed:', (err as Error).message);
  }

  // Final Check
  console.log('\n=== Final Verification ===');
  const requiredVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS',
    'ADMIN_EMAIL'
  ];

  let allGood = true;
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      console.error(`❌ Missing: ${varName}`);
      allGood = false;
    }
  });

  console.log(allGood ? '✅ All variables set!' : '🚨 Some variables missing');
}

testEnv().catch(err => console.error('Unhandled error:', err));