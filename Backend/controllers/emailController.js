const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using your SMTP credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail', // E.g., 'Gmail', 'Outlook', etc.
  secure:true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or an app password for more secure authentication
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
