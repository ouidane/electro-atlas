import nodemailer from "nodemailer";
import nodemailerConfig from "../config/nodemailerConfig";

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    await transporter.sendMail({
      from: `"Electro Atlas" <${nodemailerConfig.auth.user}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error);
  }
};

export default sendEmail;
