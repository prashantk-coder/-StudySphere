const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // CHECK ENV VARIABLES
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error(
        "MAIL_USER and MAIL_PASS must be configured properly"
      );
    }

    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    // VERIFY CONNECTION
    await transporter.verify();
    console.log("Mail server connected successfully");

    // SEND MAIL
    const info = await transporter.sendMail({
      from: `"StudySphere" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.response);

    return info;
  } catch (error) {
    console.log("SEND OTP ERROR:", error);

    throw error;
  }
};

module.exports = mailSender;