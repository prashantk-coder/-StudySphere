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
      port: 465,
      secure: true,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
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