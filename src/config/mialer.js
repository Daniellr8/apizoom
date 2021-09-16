const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL, //  user
      pass: process.env.PASSWORD, // password
    },
  });
 

  module.exports = transporter;
