require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID_EMAIL,
      process.env.CLIENT_SECRET_EMAIL,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN_EMAIL
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID_EMAIL,
        clientSecret: process.env.CLIENT_SECRET_EMAIL,
        refreshToken: process.env.REFRESH_TOKEN_EMAIL
      }
    });
  
    return transporter;
};

const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
};


// ***EXAMPLE***
// sendEmail({
//     subject: "Test",
//     text: "I am sending an email from nodemailer!",
//     to: "email of recipient",
//     from: process.env.EMAIL
// });

module.exports = sendEmail