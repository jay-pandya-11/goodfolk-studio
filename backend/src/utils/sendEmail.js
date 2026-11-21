/**
 * sendEmail — Nodemailer email dispatch utility
 *
 * Sends transactional emails (contact confirmations,
 * newsletter welcome, password resets, etc.) via SMTP.
 */
const nodemailer = require('nodemailer');

/**
 * Send an email using the configured SMTP transport
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML body of the email
 * @returns {Promise<Object>} Nodemailer send info object
 */
const sendEmail = async ({ to, subject, html }) => {
  // Create reusable SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false, // true for 465, false for other ports (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Define mail options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  // Send the email and return the info object
  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEmail;
