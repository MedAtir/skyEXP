import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact email function
export async function sendContactEmail(
  name: string, 
  email: string, 
  phone: string, 
  subject: string, 
  message: string
) {
  const mailOptions = {
    from: `"Sky Experience Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${subject}`,
    text: `
      New Contact Form Submission
      ---------------------------
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: 
      ${message}
    `,
  };

  await transporter.sendMail(mailOptions);
}