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

export const sendEmail = async (email: string , content : string) => {
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Email Subject",
    text: "hello, thank you for contacting us , we well repley to you in few days \n \n your massege is : \n "+content,
  };

   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
