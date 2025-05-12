// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
