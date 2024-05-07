import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import { forgotPasswordTemplate } from "../templates/forgot-password";
import { otpTemplates } from "../templates/otp";

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST } = process.env;

  const transport = nodemailer.createTransport({
    service: "Gmail",
    host: SMTP_HOST,
    port: 465,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      },
    );
  });
}

export const compileOTPVerificationTemplate = (
  username: string,
  otp: number,
) => {
  const template = Handlebars.compile(otpTemplates);
  const htmlBody = template({
    username,
    otp,
  });
  return htmlBody;
};

export const compileResetPasswordTemplate = (
  name: string,
  url: string,
  linkName: string,
) => {
  const template = Handlebars.compile(forgotPasswordTemplate);
  const htmlBody = template({
    name,
    url,
    linkName,
  });
  return htmlBody;
};
