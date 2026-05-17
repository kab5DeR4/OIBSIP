import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Using Ethereal Email for testing purposes
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL || 'ethereal.user@ethereal.email', // dummy fallback
      pass: process.env.SMTP_PASSWORD || 'etherealpass', // dummy fallback
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
