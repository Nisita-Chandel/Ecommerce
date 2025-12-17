// utils/emailService.js
export const sendEmail = async ({ to, subject, text }) => {
    // TODO: integrate real email provider (Nodemailer / any API)
    console.log("Mock email sent:", { to, subject, text });
  };
  