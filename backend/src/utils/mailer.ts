import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const mailer = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = (args) => {
  return mailer.sendMail({
    sender: 'test@artemdev.com',
    ...args,
  });
};
