// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     // CHECK ENV VARIABLES
//     if (
//       !process.env.MAIL_HOST ||
//       !process.env.MAIL_PORT ||
//       !process.env.MAIL_USER ||
//       !process.env.MAIL_PASS
//     ) {
//       throw new Error("Mail environment variables are missing");
//     }

//     // CREATE TRANSPORTER
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: Number(process.env.MAIL_PORT),
//       secure: false,

//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },

//       tls: {
//         rejectUnauthorized: false,
//       },

//       connectionTimeout: 30000,
//       greetingTimeout: 30000,
//       socketTimeout: 30000,
//     });

//     // VERIFY SMTP CONNECTION
//     await transporter.verify();

//     console.log("Mail server connected successfully");

//     // SEND EMAIL
//     const info = await transporter.sendMail({
//       from: `"StudySphere" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("Email sent successfully:", info.response);

//     return info;
//   } catch (error) {
//     console.log("SEND OTP ERROR:", error);

//     throw error;
//   }
// };

// module.exports = mailSender;

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudySphere" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.response);

    return info;

  } catch (error) {

    console.log("MAIL ERROR => ", error);

    throw error;
  }
};

module.exports = mailSender;