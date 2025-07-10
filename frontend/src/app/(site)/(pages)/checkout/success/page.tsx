import React from "react";
import { Metadata } from "next";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
export const metadata: Metadata = {
  title: "Order Successful | Electro Atlas",
  description: "Thank you for your purchase! Your order was placed successfully on Electro Atlas.",
  // other metadata
};

const CheckoutSuccessPage = () => {
  return (
    <main>
      <CheckoutSuccess />
    </main>
  );
};

export default CheckoutSuccessPage;
