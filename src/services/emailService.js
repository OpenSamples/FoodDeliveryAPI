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

const verifyEmail = async(email, link, name) => {
  let emailTransporter = await createTransporter();

  await emailTransporter.sendMail({
    subject: 'Verify Email Address for Dostava Hrane',
    from: 'dostavahrane06@gmail.com',
    to: email,
    html: `<div>
              <h2>Hello ${name},</h2>
              <p>
                  Thanks for registering for an account on Dostava Hrane! Before we get started, 
                  we just need to confirm that this is you. Click below to verify your email address:
              </p>
              <a href="${link}">VERIFY EMAIL</a>
          </div>`
  });
}

const send2FA = async (email, code, name) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail({
    subject: 'Your confirmation code',
    from: 'dostavahrane06@gmail.com',
    to: email,
    html: `<div>
              <h2>Hello ${name}</h2>
              <p>
                Someone made an account sign-in request. You need to confirm that it's you.
              </p>
              <br>
              <p>
                Please use code ~it will expire in 10 minutes~ below: 
              </p>
              <h1>${code}</h1>
              <br><br>
              <p>If it's not you, please change your password</p>
          </div>`
  });
}

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

module.exports = {
  sendEmail,
  verifyEmail,
  send2FA
}