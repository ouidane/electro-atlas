import React from "react";
import { Metadata } from "next";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
export const metadata: Metadata = {
  title: "Order Successful | Electro Atlas",
  description:
    "Thank you for your purchase! Your order was placed successfully on Electro Atlas.",
  keywords: [
    "order success",
    "purchase complete",
    "Electro Atlas",
    "order confirmation",
    "thank you",
  ],
  openGraph: {
    title: "Order Successful | Electro Atlas",
    description:
      "Thank you for your purchase! Your order was placed successfully on Electro Atlas.",
    url: "https://electro-atlas.com/checkout/success",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const CheckoutSuccessPage = () => {
  return (
    <main>
      <CheckoutSuccess />
    </main>
  );
};

export default CheckoutSuccessPage;
