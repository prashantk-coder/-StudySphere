const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("=================================");
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_PORT:", process.env.MAIL_PORT);
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("SENDING EMAIL TO:", email);
    console.log("=================================");

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log("TRANSPORTER CREATED SUCCESSFULLY");

    const info = await transporter.sendMail({
      from: `"StudySphere" <prashantkchahar@gmail.com>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("MESSAGE ID:", info.messageId);
    console.log("RESPONSE:", info.response);

    return info;
  } catch (error) {
    console.log("=================================");
    console.log("MAIL ERROR =>", error);
    console.log("=================================");

    throw error;
  }
};

module.exports = mailSender;