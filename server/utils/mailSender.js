const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudySphere" <prashantkchahar@gmail.com>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;