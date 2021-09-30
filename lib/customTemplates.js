import nodemailer from "nodemailer";
import "../styles/signIn.css";
import { signIn_UpHTML } from "./emailTemplateHTML";

export const customVerificationRequest = ({
  identifier: email,
  url,
  provider,
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    const { host } = new URL(url);
    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject: `Sign in to ${host}`,
        text: text({ url, host, email }),
        html: html({ url, host, email }),
      },
      (error) => {
        if (error) {
          logger.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
          return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
        }
        return resolve();
      }
    );
  });
};
const text = ({ url, host }) => `Sign in to ${host}\n${url}\n\n`;
const html = ({ url, host, email }) => {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedSite = `${host.replace(/\./g, "&#8203;.")}`;
  return signIn_UpHTML(url, escapedSite, escapedEmail);
};
