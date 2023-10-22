import nodemailer from "nodemailer";

const EMAIL =  process.env.EMAIL as string
const EMAIL_PASSWORD =  process.env.EMAIL_PASSWORD as string
const transporter = nodemailer.createTransport({

  service: "hotmail",
  auth: {
    user:EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = async (email: string) => {
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Email Subject",
    text: "hello, fuck you for contacting us, if you have any  ",
  };

   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
