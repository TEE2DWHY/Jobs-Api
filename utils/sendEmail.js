const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log("Email Sent:", info.response);
    }
  });
};

module.exports = sendEmail;
