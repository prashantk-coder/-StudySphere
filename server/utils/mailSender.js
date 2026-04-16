// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;






// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail", 
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: '"StudyNotion" <no-reply@studynotion.com>',
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (error) {
//     console.log("Error while sending mail:", error.message);
//   }
// };

// module.exports = mailSender;







const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("Mail server is ready");


    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`, // better sender
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.response);
    return info;

  } catch (error) {
    console.log("FULL ERROR:", error);   // 🔥 print full error
  }
};

module.exports = mailSender;