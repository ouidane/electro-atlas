import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout | Electro Atlas",
  description:
    "Complete your purchase securely and quickly on Electro Atlas. Enjoy fast shipping and great deals!",
  keywords: [
    "checkout",
    "Electro Atlas",
    "secure payment",
    "fast shipping",
    "buy electronics",
    "order summary",
  ],
  openGraph: {
    title: "Checkout | Electro Atlas",
    description:
      "Complete your purchase securely and quickly on Electro Atlas.",
    url: "https://electro-atlas.com/checkout",
    siteName: "Electro Atlas",
    type: "website",
  },
};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
