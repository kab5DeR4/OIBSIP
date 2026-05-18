import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    service: process.env.SMTP_SERVICE || undefined, // e.g., 'gmail'
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
