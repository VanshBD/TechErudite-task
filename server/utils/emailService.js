const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const emailTemplate = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
      </div>
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email Address',
    html: emailTemplate
  });
}; 