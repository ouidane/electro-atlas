import React from "react";
import { Metadata } from "next";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
export const metadata: Metadata = {
  title: "Checkout Success Page | NextCommerce Nextjs E-commerce template",
  description: "This is Checkout Success Page for NextCommerce Template",
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
