import fs from "fs";
import path from "path";
import ejs from "ejs";
import sendEmail from "../utils/sendEmail";
import config from "../config/config";
import { DeliveryDoc, OrderDoc, OrderItemDoc } from "../models";

// =============== Type Definitions ===============

type VerificationEmailParams = {
  email: string;
  verificationCode: string;
  origin: string;
};

type ResetPasswordParams = {
  email: string;
  token: string;
  origin: string;
};

type PaymentConfirmationParams = {
  email: string;
  delivery: DeliveryDoc;
  order: OrderDoc;
};

export class EmailService {
  private static renderTemplate(
    templateName: string,
    data: { [key: string]: unknown },
  ) {
    const templatePath = path.resolve(
      __dirname,
      "../templates",
      `${templateName}.ejs`,
    );
    const template = fs.readFileSync(templatePath, "utf-8");
    return ejs.render(template, data);
  }

  //  Authentication Emails
  static async sendVerificationEmail({
    email,
    verificationCode,
    origin,
  }: VerificationEmailParams): Promise<void> {
    const html = this.renderTemplate("emailConfirmation", {
      verificationCode,
      origin,
    });

    await sendEmail({
      to: email,
      subject: "Confirm Your Email Address - Electro Atlas",
      html,
    });
  }

  static async sendResetPasswordEmail({
    email,
    token,
    origin,
  }: ResetPasswordParams): Promise<void> {
    const resetLink = `${origin}/reset-password?resetToken=${token}`;
    const html = this.renderTemplate("passwordReset", {
      resetLink,
    });

    await sendEmail({
      to: email,
      subject: "Reset Your Password - Electro Atlas",
      html,
    });
  }

  // Order Emails
  static async sendOrderConfirmationEmail({
    email,
    delivery,
    order,
  }: PaymentConfirmationParams): Promise<void> {
    const { _id: orderId, totalAmount, orderItems } = order;
    const { shippingAddress } = delivery;
    const origin = config.clientUrl || config.baseUrl;
    const orderTrackingLink = `${origin}/order-tracking/${orderId}`;
    const accountLink = `${origin}/account`;

    const items = (orderItems as unknown as OrderItemDoc[]).map((item) => ({
      ...item,
      totalPrice: (Math.round(item.totalPrice) / 100).toFixed(2),
      unitAmount: (Math.round(item.unitAmount) / 100).toFixed(2),
    }));

    const html = this.renderTemplate("orderConfirmation", {
      orderId,
      totalAmount: (Math.round(totalAmount || 0) / 100).toFixed(2),
      orderItems: items,
      shippingAddress,
      orderTrackingLink,
      accountLink,
    });

    await sendEmail({
      to: email,
      subject: "Order Confirmation - Electro Atlas",
      html,
    });
  }
}
