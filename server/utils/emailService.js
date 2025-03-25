const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, token) => {
  try {
    // Create transporter with Gmail settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'vanshbdobariya1312@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD || 'dxhl iqdh kebe nltm'
      }
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER ||"vanshbdobariya1312@gmail.com",
      to: email,
      subject: 'Verify Your Email Address',
      html: `
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
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}; 